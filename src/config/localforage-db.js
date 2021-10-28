import localforage from 'localforage'

localforage.config({
  name: '__schema_db__',
  version: 1,
})

export default localforage
