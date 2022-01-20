import React, { useCallback, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useLazyQuery, useQuery } from '@apollo/client'

import { useMe, withAuth } from '../../../components/Auth/withAuth'
import {
  GET_POD_TASK_BOARD_PROPOSALS,
  GET_POD_TASK_BOARD_SUBMISSIONS,
  GET_POD_TASK_BOARD_TASKS,
  GET_PER_STATUS_TASK_COUNT_FOR_POD_BOARD,
} from '../../../graphql/queries/taskBoard'
import Boards from '../../../components/Pod/boards'
import {
  InReview,
  Requested,
  Archived,
} from '../../../components/Icons/sections'
import {
  TASK_STATUS_DONE,
  TASK_STATUS_IN_PROGRESS,
  TASK_STATUS_TODO,
  TASK_STATUS_REQUESTED,
  TASK_STATUS_IN_REVIEW,
  TASK_STATUS_ARCHIVED,
  DEFAULT_STATUS_ARR,
} from '../../../utils/constants'

import { PodBoardContext } from '../../../utils/contexts'
import { GET_USER_PERMISSION_CONTEXT } from '../../../graphql/queries'
import { GET_POD_BY_ID } from '../../../graphql/queries/pod'

const TO_DO = {
  status: TASK_STATUS_TODO,
  tasks: [],
  section: {
    title: 'Proposals',
    icon: Requested,
    id: '337d2b80-65fd-48ca-bb17-3c0155162a62',
    filter: {
      taskType: TASK_STATUS_REQUESTED,
    },
    expandable: true,
    action: {
      text: 'Proposal',
    },
    tasks: [],
  },
}

const IN_PROGRESS = {
  status: TASK_STATUS_IN_PROGRESS,
  tasks: [],
  section: {
    title: 'In Review',
    icon: InReview,
    id: '337d2b80-65fd-48ca-bb17-3c0155162a62',
    filter: {
      taskType: TASK_STATUS_IN_REVIEW,
    },
    expandable: true,
    action: {
      text: 'Review',
    },
    tasks: [],
  },
}

const DONE = {
  status: TASK_STATUS_DONE,
  tasks: [],
  section: {
    title: 'Archived',
    icon: Archived,
    id: '337d2b80-65fd-48ca-bb17-3c0155162a62',
    filter: {
      taskType: TASK_STATUS_ARCHIVED,
    },
    expandable: true,
    action: {
      text: 'Restore',
    },
    tasks: [],
  },
}

const COLUMNS = [TO_DO, IN_PROGRESS, DONE]

const SELECT_OPTIONS = [
  '#copywriting (23)',
  '#growth (23)',
  '#design (23)',
  '#community (11)',
  '#sales (23)',
  '#tiktok (13)',
  '#analytics (23)',
]

const LIMIT = 10

const BoardsPage = () => {
  const [columns, setColumns] = useState(COLUMNS)
  const [statuses, setStatuses] = useState(DEFAULT_STATUS_ARR)
  const router = useRouter()
  const { username, podId } = router.query
  const [pod, setPod] = useState(null)
  const { data: userPermissionsContext } = useQuery(
    GET_USER_PERMISSION_CONTEXT,
    {
      fetchPolicy: 'cache-and-network',
    }
  )
  const [podTaskHasMore, setPodTaskHasMore] = useState(false)
  const [getPod] = useLazyQuery(GET_POD_BY_ID, {
    onCompleted: (data) => {
      const fetchedPod = data?.getPodById
      setPod(fetchedPod)
    },
  })
  const [getPodTaskProposals] = useLazyQuery(GET_POD_TASK_BOARD_PROPOSALS, {
    onCompleted: (data) => {
      const newColumns = [...columns]
      const taskProposals = data?.getPodTaskBoardProposals
      newColumns[0].section.tasks = []
      taskProposals?.forEach((taskProposal) => {
        newColumns[0].section.tasks.push(taskProposal)
      })
      setColumns(newColumns)
    },
  })

  const [getPodTaskSubmissions] = useLazyQuery(GET_POD_TASK_BOARD_SUBMISSIONS, {
    onCompleted: (data) => {
      const newColumns = [...columns]
      const taskSubmissions = data?.getPodTaskBoardSubmissions
      newColumns[1].section.tasks = []
      taskSubmissions?.forEach((taskSubmission) => {
        newColumns[1].section.tasks.push(taskSubmission)
      })
      setColumns(newColumns)
    },
  })

  const [getPodBoardTaskCount, { data: podTaskCountData }] = useLazyQuery(
    GET_PER_STATUS_TASK_COUNT_FOR_POD_BOARD
  )

  const [getPodTasks, { fetchMore, variables: getPodTasksVariables }] =
    useLazyQuery(GET_POD_TASK_BOARD_TASKS, {
      onCompleted: (data) => {
        const tasks = data?.getPodTaskBoardTasks
        const newColumns = columns.map((column) => {
          column.tasks = []
          return tasks.reduce((column, task) => {
            if (column.status === task.status) {
              column.tasks = [...column.tasks, task]
            }
            return column
          }, column)
        })
        setColumns(newColumns)
        setPodTaskHasMore(
          data?.hasMore || data?.getPodTaskBoardTasks.length >= LIMIT
        )
      },
    })

  useEffect(() => {
    if (podId) {
      getPod({
        variables: {
          podId,
        },
      })
      // fetch user task boards after getting orgId from username
      getPodTasks({
        variables: {
          input: {
            podId,
            statuses,
            offset: 0,
            limit: LIMIT,
          },
        },
      })
      getPodTaskProposals({
        variables: {
          input: {
            podId,
            statuses,
            offset: 0,
            limit: LIMIT,
          },
        },
      })
      getPodTaskSubmissions({
        variables: {
          input: {
            podId,
            statuses,
            offset: 0,
            limit: LIMIT,
          },
        },
      })
      getPodBoardTaskCount({
        variables: {
          podId,
        },
      })
    }
  }, [
    podId,
    getPodTasks,
    statuses,
    getPodTaskSubmissions,
    getPodTaskProposals,
    getPodBoardTaskCount,
    getPod,
  ])

  // Handle Column changes (tasks movements)
  useEffect(() => {
    console.log('Colum Changed: ', columns)
  }, [columns])

  const handleLoadMore = useCallback(() => {
    if (podTaskHasMore) {
      fetchMore({
        variables: {
          offset: Math.max(...columns.map(({ tasks }) => tasks.length)),
          limit: LIMIT,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          const hasMore = fetchMoreResult.getPodTaskBoardTasks.length >= LIMIT
          if (!fetchMoreResult) {
            return prev
          }
          if (!hasMore) {
            setPodTaskHasMore(false)
          }
          return {
            hasMore,
            getPodTaskBoardTasks: prev.getPodTaskBoardTasks.concat(
              fetchMoreResult.getPodTaskBoardTasks
            ),
          }
        },
      }).catch((error) => {
        console.error(error)
      })
    }
  }, [podTaskHasMore, columns, fetchMore])
  return (
    <PodBoardContext.Provider
      value={{
        statuses,
        setStatuses,
        columns,
        setColumns,
        orgId: pod?.orgId,
        pod,
        podId,
        taskCount: podTaskCountData?.getPerStatusTaskCountForPodBoard,
        userPermissionsContext: userPermissionsContext?.getUserPermissionContext
          ? JSON.parse(userPermissionsContext?.getUserPermissionContext)
          : null,
        getPodTasksVariables,
      }}
    >
      <Boards
        selectOptions={SELECT_OPTIONS}
        columns={columns}
        onLoadMore={handleLoadMore}
        hasMore={podTaskHasMore}
      />
    </PodBoardContext.Provider>
  )
}

//export default withAuth(BoardsPage)
export default withAuth(BoardsPage)