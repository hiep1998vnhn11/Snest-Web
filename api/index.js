import request from '@/utils/request'
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
