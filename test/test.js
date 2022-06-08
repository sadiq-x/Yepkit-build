import assert from 'assert'
import { analytic } from '../analytics-user.js'
import { analyticsfindpost } from '../analytics-find-post.js'

describe('analytic', () => {
  it('analytic user', () => {
    let req = { headers: '', authorization: 'Bearer' }
    let res
    analytic(req, res)

  })
  it('analytics find', () => {
    let req = { headers: '', authorization: 'Bearer' }
    let res

    analyticsfindpost(req, res)
  })
})

