import 'module-alias/register'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const models = require('@data/models')
const scheduler = require('@core/services/scheduler')
const skeetService = require('@core/services/skeetService')

beforeEach(async () => {
  vi.restoreAllMocks()
  await models.Skeet.destroy({ where: {}, force: true })
})

describe('recurring skeet pause lifecycle', () => {
  it('pauses a scheduled recurring skeet without changing its schedule data', async () => {
    const scheduledAt = new Date(Date.UTC(2026, 8, 1, 8, 0, 0))
    const anchorAt = new Date(Date.UTC(2026, 7, 1, 8, 0, 0))
    const skeet = await models.Skeet.create({
      content: 'Wiederkehrender Post',
      status: 'scheduled',
      repeat: 'weekly',
      repeatDayOfWeek: 2,
      scheduledAt,
      scheduledPlannedAt: scheduledAt,
      repeatAnchorAt: anchorAt,
    })

    const result = await skeetService.pauseRecurringSkeet(skeet.id)

    expect(result.status).toBe('paused')
    expect(result.scheduledAt.getTime()).toBe(scheduledAt.getTime())
    expect(result.scheduledPlannedAt.getTime()).toBe(scheduledAt.getTime())
    expect(result.repeatAnchorAt.getTime()).toBe(anchorAt.getTime())
  })

  it('schedules the next future slot when a paused recurring skeet is resumed', async () => {
    const anchorAt = new Date(Date.UTC(2026, 7, 1, 8, 0, 0))
    const nextAt = new Date(Date.UTC(2026, 8, 8, 8, 0, 0))
    const skeet = await models.Skeet.create({
      content: 'Pausierter Post',
      status: 'paused',
      repeat: 'weekly',
      repeatDayOfWeek: 2,
      scheduledAt: new Date(Date.UTC(2026, 8, 1, 8, 0, 0)),
      scheduledPlannedAt: new Date(Date.UTC(2026, 8, 1, 8, 0, 0)),
      repeatAnchorAt: anchorAt,
    })
    vi.spyOn(scheduler, 'getNextScheduledAt').mockReturnValue(nextAt)
    vi.spyOn(scheduler, 'applyRandomOffset').mockReturnValue(nextAt)

    const result = await skeetService.resumeRecurringSkeet(skeet.id)

    expect(result.status).toBe('scheduled')
    expect(result.scheduledAt.getTime()).toBe(nextAt.getTime())
    expect(result.scheduledPlannedAt.getTime()).toBe(nextAt.getTime())
    expect(result.repeatAnchorAt.getTime()).toBe(anchorAt.getTime())
  })

  it('rejects pausing a one-time skeet', async () => {
    const skeet = await models.Skeet.create({
      content: 'Einmaliger Post',
      status: 'scheduled',
      repeat: 'none',
      scheduledAt: new Date(Date.UTC(2026, 8, 1, 8, 0, 0)),
    })

    await expect(skeetService.pauseRecurringSkeet(skeet.id)).rejects.toMatchObject({ status: 400 })
  })
})
