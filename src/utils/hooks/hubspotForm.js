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
  const [customData, setCustomData] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const fetchData = async () => {
    setIsError(false)
    setIsLoading(true)
    const formData = new FormData(form)
    const data = {
      ...customData,
      fields: []
    }
    for (var pair of formData.entries()) {
      data.fields.push({name: pair[0], value: pair[1]})
    }
    console.info(url, data)
    try {
      const res = await onFormSubmissionFetch(url, data)
      if (res.status === 200) {
        setData(res)
        setForm(false)
      } else {
        console.error(res)
        setForm(false)
        setIsError(true)
      }
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

  const handleSubmit = (e, customData) => {
    e.preventDefault()
    setForm(e.target)
    setCustomData(customData)
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
  }).then(r.json())
}


