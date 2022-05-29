import * as urls from './urls'
import {http} from '../../https/http'
export async function loginAction(params = {}) {
	return http.post(urls.login, params)
}
