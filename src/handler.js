/* eslint-disable quotes */
// const { date } = require('joi');
const { nanoid } = require("nanoid");
const notes = require("./notes");

// handler untuk menambah notes
const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;

  // random id by nanoid
  const id = nanoid(16);
  // date of created notes dan diformat menjadi bentuk ISO String
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  // membuat objek catatan baru berdasarkan value yang sudah ada
  const newNote = {
    title,
    tags,
    body,
    id,
    createdAt,
    updatedAt,
  };

  // memasukan array notes
  notes.push(newNote);

  // apakah newNote sudah masuk dalam array notes. method filter() berdasarkan 'id' catatan.
  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Catatan berhasil ditambahkan",
      data: {
        noteId: id,
      },
    });
    response.code(202);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Catatan gagal ditambahkan",
  });
  response.code(500);
  return response;
};

// handler untuk melihat semua Notes
const getAllNotesHandler = () => ({
  status: "success",
  data: {
    notes,
  },
});

// menampilkan notes berdasarkan 'id'
const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  // mendapatkan objek note dengan 'id' yang dicari
  const note = notes.filter((n) => n.id === id)[0];

  // mengembalikan objek note dan data nya
  // pastikan objek note tidak undefined yang berarti gagal atau tidak ketemu
  if (note !== undefined) {
    return {
      status: "success",
      data: {
        note,
      },
    };
  }

  const response = h.response({
    status: " fail",
    message: "catatan tidak ditemukan",
  });
  response.code(404);
  return response;
};

// handler menghapus notes by 'id'
const editNoteByIdHandler = (request, h) => {
  // mendapatkan {id}
  const { id } = request.params;
  // mendapatkan notes terbaru yang dikirimkan client melalui body request
  const { title, tags, body } = request.payload;
  // tanggal terbaru
  const updatedAt = new Date().toISOString();
  // mencari notes indexnya yang dicari yang mau diedit dengan {id} nya di notes array
  const index = notes.findIndex((note) => note.id === id);

  // findIndex() return -1 jika tidak ditemukan array yang dicari
  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };

    const response = h.response({
      status: "success",
      message: "Catatan berhasil diperbarui",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Gagal memperbaharui catatan. id tidak ditemukan",
  });
  response.code(404);
  return response;
};

const deleteNoteByIdHandler = (request, h) => {
  // mendapatkan id
  const { id } = request.params;
  // mencari index notes berdasarkan id
  const index = notes.findIndex( (note) => note.id === id) ;
  // delete notes berdasarkan index, jika findIndex return -1 maka id tidak ditemukan
  if (index !== -1){
    // delete array objek notes berdasarkan index
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    })
    response.code(200);
    return response;
  };

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus. ID tidak ditemukan',
  });
  response.code(404);
  return response;
};

// menggunakan objek literal agar memudahkan ekspor lebih dari satu nilai ada berkas javascript
module.exports = { 
  addNoteHandler, 
  getAllNotesHandler, 
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};

/**
 * Same-Origin Policy
 * server ini akan diakses dari http://notesapp-v1.dicodingacademy.com/
 * dimana aplikasi tersebut (frontend) adalah origin nya.
 * origin terdiri dari 3 hal:
 *            protokol, host, port number
 * url tersebut terdiri dari
 *      protokol: http//
 *      host: notesapp-v1.dicodingacademy.com
 *      port: 80 (implisit)
 *
 * sedangkan server kita http://localhost:5000.
 * 2 origin berbeda, sehingga akses akan tertolak
 *
 * solusinya dengan CORS (Cross-Origin Resource Sharing)
 * caranya dengan memberikan nilai ke Header 'Access-Control-Allow-Origin'
 * dengan nilai origin luar yang akan mengkonsumsi datanya
 *
 * const response = h.response({ error: false, message: 'Catatan berhasil ditambahkan' });
 * response.header('Access-Control-Allow-Origin', 'http://notesapp-v1.dicodingacademy.com');
 * return response;
 *
 * atau dengan '*' pada origin bila diperbolehkan dikonsumsi seluruh origin
 *
 * const response = h.response({ error: false, message: 'Catatan berhasil ditambahkan' });
 * response.header('Access-Control-Allow-Origin', '*');
 * return response;
 *
 * namun dengan HAPI akan lebih mudah.
 *
 */
