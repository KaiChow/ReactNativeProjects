import Constants from './Constants';
/**
 * Get
 */
export function get(api: string) {
    return async (parmas?: {}) => {
        const { headers, url } = Constants;
        return handleData(
            fetch(buildParmas(url + api, parmas), {
                headers: {
                    ...headers,
                },
            }),
        );
    };
}

export function post(api: string) {
    return (parmas: {}) => {
        return async (queryParmas?: {} | string) => {
            const { headers, url } = Constants;
            var data = parmas instanceof FormData ? parmas : JSON.stringify(parmas);
            return handleData(
                fetch(buildParmas(url + api, queryParmas), {
                    method: 'POST',
                    body: data,
                    headers: {
                        'content-type': 'application/json',
                        ...headers,
                    },
                }),
            );
        };
    };
}
/**
 * 处理接口返回参数
 * @param doAction
 */
function handleData(doAction: Promise<any>) {
    return new Promise((resolve, reject) => {
        doAction
            .then(res => {
                //解析contenttype
                const type = res.headers.get('Content-Type');
                if ((type || '').indexOf('json')) {
                    return res.json();
                }
                return res.next();
            })
            .then(result => {
                console.log(JSON.stringify(result));

                if (typeof reject === 'string') {
                    throw new Error(result);
                }
                const { code, msg, data: { list = undefined } = {} } = result;
                if (code === 401) {
                    //todo登录页
                    return
                }
                resolve(list || result);
            })
            .catch(error => {
                reject(error);
            });
    });
}
/**
 * 构建url参数
 * @param url
 * @param parmas
 * @returns
 */
function buildParmas(url: string, parmas?: {} | string): string {
    let newUrl = new URL(url),
        finalUrl;
    if (typeof parmas === 'object') {
        for (const [key, value] of Object.entries(parmas)) {
            newUrl.searchParams.append(key, value as string);
        }
        finalUrl = newUrl.toString();
    } else if (typeof parmas === 'string') {
        finalUrl = url.endsWith('/') ? url + parmas : url + '/' + parmas;
    } else {
        finalUrl = newUrl.toString();
    }
    console.log('---buildParmas---', finalUrl);
    return finalUrl;
}
