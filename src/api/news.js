import request from '@/utils/request'

export function updateNews(news) {
    return request({
      url: '/news/detail',
      method: 'post',
      data: news
    })
  }

  export function deleteNews(newsId) {
    return request({
      url: '/news/detail',
      method: 'delete',
      params: { newsId }
    })
  }

  export function findNewsList(condition) {
    return request({
      url: '/news/list',
      method: 'post',
      data: condition
    })
  }