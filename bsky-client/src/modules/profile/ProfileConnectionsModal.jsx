import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import useSWRInfinite from 'swr/infinite'
import { Button, Card, RichText, ActorProfileLink } from '../shared'
import DetailPaneHeader from '../shared/DetailPaneHeader.jsx'
import { useTranslation } from '../../i18n/I18nProvider.jsx'
import { fetchFollowers, fetchFollows, followActor, unfollowActor } from '../shared/api/bsky.js'
import { CheckIcon, PlusIcon } from '@radix-ui/react-icons'

const PAGE_SIZE = 30

export default function ProfileConnectionsModal ({
  open = false,
  type = null,
  actor = '',
  profile = null,
  currentUserDid = '',
  onClose = () => {},
  onSelectProfile
}) {
  const { t } = useTranslation()
  const listType = type === 'following' ? 'following' : 'followers'
  const listLabel = listType === 'followers'
    ? t('profile.stats.followers', 'Follower')
    : t('profile.stats.following', 'Folge ich')
  const headline = profile?.displayName || profile?.handle || actor || listLabel
  const listScrollRef = useRef(null)
  const loadMoreTriggerRef = useRef(null)
  const [followOverrides, setFollowOverrides] = useState({})
  const [followPending, setFollowPending] = useState({})

  const targetActor = (actor || profile?.did || profile?.handle || '').trim()

  useEffect(() => {
    setFollowOverrides({})
    setFollowPending({})
  }, [targetActor, listType])

  const getListKey = useCallback((pageIndex, previousPageData) => {
    if (!open || !targetActor) return null
    if (previousPageData && !previousPageData.cursor) return null
    const cursor = pageIndex === 0 ? null : previousPageData?.cursor || null
    return ['profile-connections', listType, targetActor, cursor]
  }, [open, listType, targetActor])

  const fetchListPage = useCallback(async ([, listKind, actorKey, cursor]) => {
    if (!actorKey) return { items: [], cursor: null }
    if (listKind === 'following') {
      return fetchFollows({ actor: actorKey, cursor: cursor || undefined, limit: PAGE_SIZE })
    }
    return fetchFollowers({ actor: actorKey, cursor: cursor || undefined, limit: PAGE_SIZE })
  }, [])

  const {
    data,
    error,
    size,
    setSize,
    isLoading,
    isValidating
  } = useSWRInfinite(getListKey, fetchListPage, {
    revalidateFirstPage: false
  })

  const pages = useMemo(() => (Array.isArray(data) ? data.filter(Boolean) : []), [data])
  const items = useMemo(() => {
    if (!pages.length) return []
    return pages.flatMap((page) => Array.isArray(page?.items) ? page.items : [])
  }, [pages])

  const lastPage = pages[pages.length - 1] || null
  const hasMore = Boolean(lastPage?.cursor)
  const isLoadingInitial = isLoading && pages.length === 0
  const isLoadingMore = !isLoadingInitial && isValidating && hasMore
  const showInlineError = Boolean(error && items.length > 0)

  useEffect(() => {
    if (!open) return
    setSize(1)
  }, [open, listType, setSize, targetActor])

  const loadMore = useCallback(async () => {
    if (!hasMore || isLoadingInitial || isLoadingMore) return
    try {
      await setSize(size + 1)
    } catch {
      // error handled by SWR
    }
  }, [hasMore, isLoadingInitial, isLoadingMore, setSize, size])

  useEffect(() => {
    if (!hasMore || !loadMoreTriggerRef.current || showInlineError || !open) return
    const root = listScrollRef.current
    if (!root) return
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0]
      if (entry?.isIntersecting) {
        loadMore()
      }
    }, {
      root,
      rootMargin: '200px 0px'
    })
    const target = loadMoreTriggerRef.current
    observer.observe(target)
    return () => observer.unobserve(target)
  }, [hasMore, loadMore, open, showInlineError])

  const handleToggleFollow = useCallback((person) => {
    const key = person?.did || person?.handle
    if (!key || followPending[key]) return
    const overrideExists = Object.prototype.hasOwnProperty.call(followOverrides, key)
    const currentFollowing = overrideExists
      ? followOverrides[key]
      : (person?.viewer?.following || null)
    setFollowPending((prev) => ({ ...prev, [key]: true }))
    if (currentFollowing) {
      unfollowActor({ uri: currentFollowing })
        .then(() => {
          setFollowOverrides((prev) => ({ ...prev, [key]: null }))
        })
        .catch(() => {
          /* ignore */
        })
        .finally(() => {
          setFollowPending((prev) => {
            const next = { ...prev }
            delete next[key]
            return next
          })
        })
      return
    }
    followActor({ actor: key })
      .then((res) => {
        const uri = res?.uri || res?.data?.uri || null
        setFollowOverrides((prev) => ({ ...prev, [key]: uri || null }))
      })
      .catch(() => {
        /* ignore */
      })
      .finally(() => {
        setFollowPending((prev) => {
          const next = { ...prev }
          delete next[key]
          return next
        })
      })
  }, [followOverrides, followPending])

  if (!open) return null

  return (
    <div className='absolute inset-0 z-40 flex flex-col bg-background'>
      <div className='flex h-full flex-col overflow-hidden'>
        <DetailPaneHeader
          title={headline}
          onBack={onClose}
          backLabel={t('profile.actions.back', 'Zurück')}
        />
        <div
          ref={listScrollRef}
          className='flex-1 overflow-y-auto p-3 sm:p-4'
        >
          {isLoadingInitial ? (
            <div className='flex min-h-[200px] items-center justify-center text-sm text-foreground-muted'>
              {t('common.status.loading', 'Lade…')}
            </div>
          ) : error && items.length === 0 ? (
            <Card padding='p-4' className='space-y-3'>
              <p className='text-sm text-destructive'>{error?.message || t('common.errors.generic', 'Es ist ein Fehler aufgetreten.')}</p>
              <Button variant='secondary' size='pill' onClick={() => setSize(1)}>
                {t('common.actions.retry', 'Erneut versuchen')}
              </Button>
            </Card>
          ) : items.length === 0 ? (
            <p className='text-sm text-foreground-muted'>{t('common.status.noResults', 'Keine Ergebnisse gefunden.')}</p>
          ) : (
            <ul className='space-y-3'>
              {items.map((person) => {
                const key = person.did || person.handle
                const overrideExists = Object.prototype.hasOwnProperty.call(followOverrides, key)
                const overrideValue = overrideExists ? followOverrides[key] : undefined
                const currentFollowing = overrideExists
                  ? overrideValue
                  : (person?.viewer?.following || null)
                const isFollowing = Boolean(currentFollowing)
                const isPending = Boolean(followPending[key])
                const isSelf = currentUserDid && person?.did === currentUserDid
                return (
                  <li key={key}>
                    <Card
                      padding='p-4'
                      onClick={() => onSelectProfile?.(person)}
                      className='flex cursor-pointer flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'
                    >
                      <div className='flex items-start gap-3'>
                        {person.avatar ? (
                          <img src={person.avatar} alt='' className='h-14 w-14 rounded-full border border-border object-cover' />
                        ) : (
                          <div className='h-14 w-14 rounded-full border border-border bg-background-subtle' />
                        )}
                        <div className='min-w-0'>
                          <p className='font-semibold text-foreground truncate'>{person.displayName || person.handle}</p>
                          <ActorProfileLink
                            actor={person.did || person.handle}
                            handle={person.handle}
                            className='text-sm text-foreground-muted truncate text-left hover:text-primary'
                          >
                            @{person.handle}
                          </ActorProfileLink>
                          {(person.viewer?.followedBy) ? (
                            <div className='mt-2'>
                              <span className='inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary'>
                                {t('profile.preview.followedBy', 'Folgt dir')}
                              </span>
                            </div>
                          ) : null}
                          {person.description ? (
                            <p className='mt-2 text-sm text-foreground'>
                              <RichText
                                text={person.description}
                                className='line-clamp-3 break-words'
                                hashtagContext={{ authorHandle: person.handle }}
                              />
                            </p>
                          ) : null}
                        </div>
                      </div>
                      {!isSelf ? (
                        <Button
                          variant={isFollowing ? 'secondary' : 'primary'}
                          size='pill'
                          onClick={(event) => {
                            event.stopPropagation()
                            handleToggleFollow(person)
                          }}
                          aria-busy={isPending || undefined}
                          className='w-full shrink-0 sm:w-44'
                        >
                          {isFollowing ? (
                            <>
                              <CheckIcon className='h-4 w-4' />
                              {t('search.people.following', 'Folge ich')}
                            </>
                          ) : (
                            <>
                              <PlusIcon className='h-4 w-4' />
                              {t('search.people.follow', 'Folgen')}
                            </>
                          )}
                        </Button>
                      ) : null}
                    </Card>
                  </li>
                )
              })}
            </ul>
          )}
          {items.length > 0 ? (
            <div className='mt-4 space-y-3'>
              {showInlineError ? (
                <Card padding='p-4' className='space-y-3'>
                  <p className='text-sm text-destructive'>
                    {error?.message || t('common.errors.loadMoreFailed', 'Weitere Ergebnisse konnten nicht geladen werden.')}
                  </p>
                  <Button variant='secondary' size='pill' onClick={loadMore}>
                    {t('common.actions.retry', 'Erneut versuchen')}
                  </Button>
                </Card>
              ) : null}
              {hasMore ? (
                <div ref={loadMoreTriggerRef} className='text-center text-xs text-foreground-muted'>
                  {isLoadingMore
                    ? t('common.status.autoLoading', 'Weitere Ergebnisse werden automatisch geladen…')
                    : t('common.status.loading', 'Lade…')}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
