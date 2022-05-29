import axios from 'axios'
import {Message, Loading} from 'element-ui'

/**
 * HTTP 状态码
 */
const httpStatusCode = {
	STATUS_UNAUTHORIZED: 401,
	STATUS_NETWORK_ERROR: 0
}

// process.env.NODE_ENV == 'development'
const baseURL = 'http://124.222.147.69/test'
const timeout = 60000

const _axios = axios.create({
	baseURL,
	timeout
})

const httpTenSeconds = axios.create({
	timeout: 10000
})

let loadingInstance = null //这里是loading

/* 请求拦截器（请求之前的操作） */
_axios.interceptors.request.use(
	config => {
		loadingInstance = Loading.service({
			lock: true,
			text: 'loading...'
		})
		return config
	},
	err => Promise.reject(err)
)

/* 请求之后的操作 */
_axios.interceptors.response.use(
	res => {
		loadingInstance.close()
		if (res.data.code === 401) {
			Message({
				message: '无权限操作',
				type: 'error',
				duration: 3 * 1000
			})
		}
		if (res.data.code === 400 || res.data.code === 404) {
			Message({
				message: '请求网络失败',
				type: 'error',
				duration: 3 * 1000
			})
		}
		return res
	},
	err => {
		if (err) {
			loadingInstance.close()
			Message({
				message: '请求网络失败',
				type: 'error',
				duration: 3 * 1000
			})
		}
		return Promise.reject(err)
	}
)

//封装post,get方法
const http = {
	get(url = '', params = {}) {
		return new Promise((resolve, reject) => {
			_axios({
				url,
				params,
				headers: {'Content-Type': 'application/json;charset=UTF-8'},
				method: 'GET'
			})
				.then(res => {
					resolve(res)
					return res
				})
				.catch(error => {
					reject(error)
				})
		})
	},
	post(url = '', params = {}) {
		return new Promise((resolve, reject) => {
			_axios({
				url,
				data: params,
				headers: {'Content-Type': 'application/json;charset=UTF-8'},
				method: 'POST'
			})
				.then(res => {
					resolve(res)
					return res
				})
				.catch(error => {
					reject(error)
				})
		})
	}
}

export {http, httpStatusCode, httpTenSeconds}
