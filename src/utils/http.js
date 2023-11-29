export const sendReqJson = async (url, verb, token, body=undefined) => {
  const options = {
    method: verb,
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    cache: "no-cache",
  };

  if (token !== null) {
    options.headers.Authorization = token;
    }

  if (body !== undefined) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);
  return await response.json();
}

export const sendReqGetPic = async (url, token) => {
    const options = {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-cache",
    };

    
  if (token !== null) {
    options.headers.Authorization = token;
    }

    const response = await fetch(url, options);
    return await response.blob();
}