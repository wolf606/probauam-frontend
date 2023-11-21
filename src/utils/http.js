export const sendReqJson = async (url, verb, token, body=undefined) => {
  const options = {
    method: verb,
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  };

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
            "Authorization": token !== null ? token : "",
        },
    };

    const response = await fetch(url, options);
    return await response.blob();
}

export const sendReqFormData = async (url, verb, token, body) => {
    const newFormData = objectToFormData(body);

    const options = {
        method: verb,
        mode: "cors",
        headers: {
            "Accept": "application/json",
            "Authorization": token !== null ? token : "",
        },
        body: newFormData,
    };

    const response = await fetch(url, options);
    return await response.json();
}

function objectToFormData(obj) {
    const formData = new FormData();

    for (const key in obj) {
        if (typeof obj[key] === "object" || Array.isArray(obj[key])) {
            formData.append(key, JSON.stringify(obj[key]));
        } else {
            formData.append(key, obj[key]);
        }
    }

    return formData;
}