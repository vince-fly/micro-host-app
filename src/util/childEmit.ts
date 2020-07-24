import store from '@/store';


function changeDataMsg(val: string) {
  store.dispatch('send-data/changeMsg', val)
}

export {
  changeDataMsg
}
