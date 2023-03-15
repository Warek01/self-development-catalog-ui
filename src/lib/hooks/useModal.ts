import { useState, useEffect } from 'react'

const useModal = () => {
  const [showModal, setShowModal] = useState<boolean>(false)

  useEffect(() => {
    showModal
      ? document.body.classList.add('overflow-hidden')
      : document.body.classList.remove('overflow-hidden')
  }, [showModal])

  return [showModal, setShowModal] as const
}

export default useModal
