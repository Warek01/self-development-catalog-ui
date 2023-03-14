import type { ToastContainerProps } from 'react-toastify'

const toastDefaultProps: ToastContainerProps = {
  autoClose: 3000,
  draggable: true,
  closeButton: true,
  enableMultiContainer: false,
  icon: true,
  position: 'top-right',
  theme: 'light',
  draggableDirection: 'x',
  rtl: false,
  draggablePercent: 50,
  newestOnTop: true,
  hideProgressBar: false,
  pauseOnHover: false,
  containerId: '',
  limit: 3,
  pauseOnFocusLoss: true,
  closeOnClick: false,
}

export default toastDefaultProps
