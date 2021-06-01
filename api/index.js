import request from '@/utils/request'
import { PER_PAGE, COMMENT_PER_PAGE } from '@/const'
export function fetchUserFriend(
  url = '',
  page = 1,
  searchKey = null,
  type = null
) {
  let requestUrl = `/v1/user/${url}/get_friend?page=${page}&limit=12`
  if (type) requestUrl += `&type=${type}`
  if (searchKey) requestUrl += `&search_key=${searchKey}`
  return request({ url: requestUrl })
}

export function fetchMessageRoom(page = 1, searchKey = null) {
  let requestUrl = `/v1/user/room/get?limit=12&page=${page}`
  if (searchKey) requestUrl += `&search_key=${searchKey}`
  return request({ url: requestUrl })
}

export function fetchFeedPost(page = 1) {
  return request({
    url: `/v1/user/post?page=${page}&limit=${PER_PAGE}`
  })
}

export function fetchPostComment(postId = null, page = 1) {
  let requestUrl = `/v1/user/post/${postId}/get_comment?page=${page}&limit=${COMMENT_PER_PAGE}`
  return request({ url: requestUrl })
}
