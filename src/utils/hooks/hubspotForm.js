import {useState, useEffect} from 'react'

/**
 * https://developers.hubspot.com/docs/methods/forms/submit_form_v3
 * @param portalId
 * @param formId
 * @return {{isLoading: boolean, handleSubmit: handleSubmit, isError: boolean, data: any}}
 */
export const useForm = ({portalId, formId}) => {
  if (!portalId || !formId) {
    console.log('you must provide portalId and formId')
    return
  }
  const url = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`
  const [data, setData] = useState()
  const [form, setForm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const fetchData = async () => {
    setIsError(false)
    setIsLoading(true)
    const formData = new FormData(form)
    const data = {
      submittedAt: `${Date.now()}`,
      fields: []
    }
    for (var pair of formData.entries()) {
      data.fields.push({name: pair[0], value: pair[1]})
    }
    // const fetchOptions = {
    //   method: 'POST',
    //   mode: 'no-cors',
    //   body: JSON.stringify(data),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // }
    try {
      const res = await formv3(url, data)
      setData(res)
      setForm(false)
    } catch (e) {
      console.error(e)
      setForm(false)
      setIsError(true)
    }
    setIsLoading(false)

    // console.log(fetchOptions)
    // try {
    //   const res = await fetch(url, fetchOptions)
    //   const result = await res.json()
    //   setIsLoading(false)
    //   console.log('Success:', JSON.stringify(result))

    // } catch (e) {
    //   debugger
    //   console.error('Error:', e)
    // }
    // setIsLoading(false)
  }

  useEffect(
    () => {
      if (form) {
        fetchData()
      }
    },
    [form]
  )

  const handleSubmit = e => {
    e.preventDefault()
    setForm(e.target)
  }

  return {data, isLoading, isError, handleSubmit}
}


/**
 *
 * @param url
 * @param data
 * @return {Promise<any>}
 */
function formv3 (url, data) {
  return new Promise((resolve, reject) => {
    // Create the new request
    const xhr = new XMLHttpRequest()
    const final_data = JSON.stringify(data)

    xhr.open('POST', url)
    // Sets the value of the 'Content-Type' HTTP request headers to 'application/json'
    xhr.setRequestHeader('Content-type', 'application/json')

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        resolve(xhr.responseText)
      } else if (xhr.readyState == 4 && xhr.status == 400) {
        reject(xhr.responseText)
        alert(xhr.responseText) // Returns a 400 error the submission is rejected.
      } else if (xhr.readyState == 4 && xhr.status == 403) {
        reject(xhr.responseText)
        alert(xhr.responseText) // Returns a 403 error if the portal isn't allowed to post submissions.
      } else if (xhr.readyState == 4 && xhr.status == 404) {
        reject(xhr.responseText)
        alert(xhr.responseText) //Returns a 404 error if the formGuid isn't found
      } else {
        reject(xhr.responseText)
      }
    }
    // Sends the request
    xhr.send(final_data)
  })
}

