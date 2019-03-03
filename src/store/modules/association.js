import {getAssociationInfo} from '@/api/association'


const association = {
  state: {

  },
  mutations: {

  },

  actions: {
    //获取社团信息
    GetAssociationInfo(assocId) {
      return new Promise((resolve, reject) => {
        getAssociationInfo(assocId).then(response => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default association
