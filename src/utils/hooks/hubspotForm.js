import {useState, useEffect} from 'react'

/**
 * https://developers.hubspot.com/docs/methods/forms/submit_form_v3
 * @param portalId
 * @param formId
 * @return {{isLoading: boolean, handleSubmit: handleSubmit, isError: boolean, data: any}}
 */
export const useForm = ({api}) => {
  if (!api) {
    console.log('you must an API endpoint')
    return {}
  }
  // const url = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`
  const url = api
  const [data, setData] = useState(false)
  const [form, setForm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const fetchData = async () => {
    setIsError(false)
    setIsLoading(true)
    const formData = new FormData(form)
    const data = {
      fields: [],
      'legalConsentOptions': { // Include this object when GDPR options are enabled
        'consent': {
          'consentToProcess': true,
          'text': 'I agree to allow Example Company to store and process my personal data.',
          'communications': [
            {
              'value': true,
              'subscriptionTypeId': 999,
              'text': 'I agree to receive marketing communications from Example Company.'
            }
          ]
        }
      }
    }
    if (window.hubspotutk) {
      data.context = {
        'hutk': window.hubspotutk, // include this parameter and set it to the hubspotutk cookie value to enable cookie tracking on your submission
        'pageUri': window.location.href
      }
    }
    for (var pair of formData.entries()) {
      data.fields.push({name: pair[0], value: pair[1]})
    }
    try {
      const res = await onFormSubmissionFetch(url, data)
      setData(res)
      setForm(false)
    } catch (e) {
      console.error(e)
      setForm(false)
      setIsError(true)
    }
    setIsLoading(false)
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

function onFormSubmissionFetch (url, data) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(r => r.json())
}


/**
 *
 * @param url
 * @param data
 * @return {Promise<any>}
 */
function onFormSubmission (url, data) {
  return new Promise((resolve, reject) => {
    // Create the new request
    const xhr = new XMLHttpRequest()
    const final_data = JSON.stringify(data)

    xhr.open('POST', url)
    // Sets the value of the 'Content-Type' HTTP request headers to 'application/json'
    xhr.setRequestHeader('Content-type', 'application/json')

    xhr.onreadystatechange = function () {
      debugger
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

