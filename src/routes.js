const { 
  addNoteHandler, 
  getAllNotesHandler, 
  getNoteByIdHandler, 
  editNoteByIdHandler,
  deleteNoteByIdHandler,
} = require('./handler');

const routes = [
  // menambahkan notes
  {
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler,

    /**
     * opsi untuk mengaktifkan CORS (Cross-Origin Resource Sharing)
     * agar dapat dikonsumsi origin lain
     * disini konfigurasi dilakukan pada routes.
     * bisa saja pengaturan dilakukan di server dibuat -- Hapi.server() --
     */
    // option: {
    //   cors: {
    //     origin: ['*'],
    //   },
    // },
  },

  // menampilkan semua notes
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNotesHandler,
  },

  // menampilkan notes yang dipilih
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNoteByIdHandler,
  },

  // mengedit catatan
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: editNoteByIdHandler,
  },

  // menghapus notes
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNoteByIdHandler,
  },
];

module.exports = routes;
