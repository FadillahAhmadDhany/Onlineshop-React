import React,{Component} from "react";
import axios from "axios";
import $ from "jquery";

import Modal from "../component/Modal";
import Toast from "../component/Toast";
import './Profile.css';

class Profiles extends Component {
  constructor() {
    super();
    this.state = {
      user: [],
      id_user: "",
      nama_user: "",
      nama_lengkap: "",
      no_hp: "",
      tanggal_lahir: "",
      jenis_kelamin: "",
      find: "",
      message: "",
      img_user: null,

      data_pengiriman: [],
      id_pengiriman:"",
      judul:"",
      nama_penerima:"",
      kode_pos:"",
      kecamatan:"",
      kota:"",
      jalan:"",
      rt:"",
      rw:"",
    }

    // jika tidak terdapat data token pada local storage
    if(!localStorage.getItem("Token")){
      // direct ke halaman login
      window.location = "/login";
    }
  }

    bind = (event) => {
      this.setState({[event.target.name] : event.target.value});
    }

    bindImage = (event) => {
      this.setState({img_user: event.target.files[0]})
    }

    Add_alamat = () => {
      
      $("#modal_alamat").modal("show");
      
      this.setState({
        action: "insert",
        id_pengiriman: "",
        id_user: "",
        judul: "",
        nama_penerima: "",
        kode_pos: "",
        kecamatan: "",
        kota: "",
        jalan: "",
        rt: "",
        rw: "",
      });
    }

    Edit_alamat = (item) => {
      // membuka modal
      $("#modal_alamat").modal("show");
      // mengisikan data pada form
      this.setState({
        action: "update",
        id_pengiriman: item.id_pengiriman,
        id_user: item.id_user,
        judul: item.judul,
        nama_penerima: item.nama_penerima,
        kode_pos: item.kode_pos,
        kecamatan: item.kecamatan,
        kota: item.kota,
        jalan: item.jalan,
        rt: item.rt,
        rw: item.rw,
      });
    }

    Edit = (item) => {
      // membuka modal
      $("#modal_user").modal("show");
      // mengisikan data pada form
      this.setState({
        action: "update",
        id_user: item.id_user,
        nama_user: item.nama_user,
        nama_lengkap: item.nama_lengkap,
        no_hp: item.no_hp,
        tanggal_lahir: item.tanggal_lahir,
        jenis_kelamin: item.jenis_kelamin,
        img_user: item.img_user,
      });
      
    }
    
    get_profile = () => {
      // $("#loading").toast("show");
      let id = JSON.parse(localStorage.getItem('id_user'))

      let url = "http://localhost/eproduk/public/user/"+id;
      axios.get(url)
      .then(response => {
        this.setState({
          user: response.data.user,
        });
        $("#loading").toast("hide");
      })
      .catch(error => {
        console.log(error);
      });
  }
    get_alamat = () => {
      // $("#loading").toast("show");
      let id = JSON.parse(localStorage.getItem('id_user'))

      let url = "http://localhost/eproduk/public/address/"+id;
      axios.get(url)
      .then(response => {
        this.setState({
          data_pengiriman: response.data.data_pengiriman,
        });
        $("#loading").toast("hide");
      })
      .catch(error => {
        console.log(error);
      });
  }

    // get_user = () => {
    //   // $("#loading").toast("show");
    //   let url = "http://localhost/eproduk/public/user";
    //   axios.get(url)
    //   .then(response => {
    //     this.setState({user: response.data.user});
    //     $("#loading").toast("hide");
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
    // }

    Drop_alamat = (id_pengiriman) => {
      if(window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
        // $("#loading").toast("show");
        let url = "http://localhost/eproduk/public/address/drop/"+id_pengiriman;
        axios.delete(url)
        .then(response => {
          $("#loading").toast("hide");
          this.setState({message: response.data.message});
          $("#message").toast("show");
          this.get_alamat();
        })
        .catch(error => {
          console.log(error);
        });
      }
    }

    Drop = (id) => {
      if(window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
        // $("#loading").toast("show");
        let url = "http://localhost/eproduk/public/user"+id.user;
        axios.delete(url)
        .then(response => {
          $("#loading").toast("hide");
          this.setState({message: response.data.message});
          $("#message").toast("show");
          this.get_user();
        })
        .catch(error => {
          console.log(error);
        });
      }
    }

    componentDidMount = () => {
      this.get_profile();
      this.get_alamat();
    }

    Save = (event) => {
      event.preventDefault();
      // menampilkan proses loading
      // $("#loading").toast("show");
      // menutup form modal
      $("#modal_user").modal("hide");
      let url = "http://localhost/eproduk/public/user/save_profile";
      let form = new FormData();
      form.append("action", this.state.action);
      form.append("id_user", this.state.id_user);
      form.append("nama_user", this.state.nama_user);
      form.append("nama_lengkap", this.state.nama_lengkap);
      form.append("tanggal_lahir", this.state.tanggal_lahir);
      form.append("jenis_kelamin", this.state.jenis_kelamin);
      form.append("no_hp", this.state.no_hp);
      form.append("img_user", this.state.img_user, this.state.img_user.name);
      axios.post(url, form)

      .then(response => {
        // $("#loading").toast("hide");
        this.setState({message: response.data.message});
        $("#message").toast("show");
        this.get_profile();
      })
      .catch(error => {
        console.log(error);
      });
    }

    Save_alamat = (event) => {
      let id = JSON.parse(localStorage.getItem('id_user'))
      event.preventDefault();
      // menampilkan proses loading
      // $("#loading").toast("show");
      // menutup form modal
      $("#modal_alamat").modal("hide");
      let url = "http://localhost/eproduk/public/address/save";
      let form = new FormData();
      form.append("action", this.state.action);
      form.append("id_pengiriman", this.state.id_pengiriman);
      form.append("id_user", id);
      form.append("judul", this.state.judul);
      form.append("nama_penerima", this.state.nama_penerima);
      form.append("kode_pos", this.state.kode_pos);
      form.append("kecamatan", this.state.kecamatan);
      form.append("kota", this.state.kota);
      form.append("jalan", this.state.jalan);
      form.append("rt", this.state.rt);
      form.append("rw", this.state.rw);
      axios.post(url, form)

      .then(response => {
        // $("#loading").toast("hide");
        this.setState({message: response.data.message});
        $("#message").toast("show");
        this.get_alamat();
      })
      .catch(error => {
        console.log(error);
      });
    }

    search = (event) => {
      if(event.keyCode === 13) {
        $("#loading").toast("show");
        let url = "http://localhost/eproduk/public/profiles";
        let form = new FormData();
        form.append("find", this.state.find);
        axios.post(url, form)
        .then(response => {
          $("#loading").toast("hide");
          this.setState({profiles: response.data.profiles});
        })
        .catch(error => {
          console.log(error);
        });
      }
    }

    render(){
      const { user, data_pengiriman } = this.state;
      return(
        <div className="container">
          <div>
          <div style={{ paddingTop: "4%" }}>
            <div className="#" style={{ maxwidth: "200px" }}>
              <div className="row no-gutters shadow">
                <div className="col-sm-3 ">
                
                { this.state.user.map((item) => {
                    return(
                  <img src={"http://localhost/eproduk/public/image/user/" + item.img_user} className="rounded mx-auto d-block" style={{marginTop: "80px",  width: "200px"}} />
                  );
                })}
                
                  </div>
                
                <div className="col-md-8 ">
                  <div className="card-body">
                  <center><h4 className="card-title" style={{ fontWeight: "500" }}>Data Diri</h4></center>
                  
                    <table className="table table-borderless">
                    { this.state.user.map((item) => {
                    return(
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">Username : {item.nama_user}</li>
                        <li className="list-group-item">Email : {item.email}</li>
                        <li className="list-group-item">Nama Lengkap : {item.nama_lengkap}</li>
                        <li className="list-group-item">Tanggal Lahir : {item.tanggal_lahir}</li>
                        <li className="list-group-item">Jenis Kelamin : {item.jenis_kelamin}</li>
                        <li className="list-group-item">No Hp : {item.no_hp}</li>
                        <li className="list-group-item">
                          <button className="m-1 btn btn-sm btn-outline-success" onClick={() => this.Edit(item)}>
                            <span className="fa fa-edit">Edit</span>
                          </button>
                        </li>
                      </ul>
                      );
                    })}
                    </table>
                    {/* <button type="#" className="btn btn-outline-info pull-left m-2">
                      <span className="fa fa-edit"></span> Edit
                      </button> */}

                  </div>
                </div>
              </div>
            </div>
            <div className="card-body">
            <center><h4 className="card-title" style={{ fontWeight: "500"}}>Data Pengiriman
            <button className="m-1 btn btn-sm btn-outline-success" onClick={this.Add_alamat}>
              <span className="fa fa-edit">Tambah Alamat</span>
            </button>
            </h4>
            </center>
              <div class="row">
            { this.state.data_pengiriman.map((item) => {
                    return(
                      <div class="col-sm-5" style={{marginTop:"5%", marginLeft:"5%"}}>
                        <div class="card shadow" style={{ marginBottom: "20px"}}>
                        <div class="card-header card-0 text-white bg-info " style={{ textAlign: "center"}}>
                         {item.judul}
                        </div>
                      <div class="card-body">
                      <ul className="list-group list-group-flush">
                        
                        <li className="list-group-item">Nama Penerima : {item.nama_penerima}</li>
                        <li className="list-group-item">Kode Pos : {item.kode_pos}</li>
                        <li className="list-group-item">Kecamatan : {item.kecamatan}</li>
                        <li className="list-group-item">Kota : {item.kota}</li>
                        <li className="list-group-item">Jalan : {item.jalan}</li>
                        <li className="list-group-item">RT : {item.rt}</li>
                        <li className="list-group-item">RW : {item.rw}</li>
                        <li className="list-group-item">
                          <button className="m-1 btn btn-sm btn-outline-success" onClick={() => this.Edit_alamat(item)}>
                            <span className="fa fa-edit">Edit</span>
                          </button>
                          <button className="m-1 btn btn-sm btn-outline-danger"
                            onClick={() => this.Drop_alamat(item.id_pengiriman)}>
                            <span className="fa fa-trash"></span>
                          </button>
                        </li>
                      </ul>
                      </div>
                      </div>
                      </div>
                      );
                    })}
            
            </div>
            <br/>
            
            </div>
          </div>

          <Modal id="modal_user" title="Form User" bg_header="primary" text_header="white">
                <form onSubmit={this.Save}>
                Username
                  <input type="text" className="form-control" name="nama_user"
                    value={this.state.nama_user} onChange={this.bind} required />
                Nama
                  <input type="text" className="form-control" name="nama_lengkap"
                    value={this.state.nama_lengkap} onChange={this.bind} required />
                  <div className="form-group">
                    <label htmlFor="role">Jenis Kelamin</label>
                    <select className="form-control" name="jenis_kelamin" value={this.state.value} onChange={this.bind} required>
                      <option value="laki-laki">Laki laki</option>
                      <option value="perempuan">Perempuan</option>
                    </select>
                  </div>
                  Tanggal Lahir
                  <input type="date" className="form-control" name="tanggal_lahir"
                    value={this.state.tanggal_lahir} onChange={this.bind} required />
                  Foto
                  <input type="file" className="form-control" name="img_user"
                   onChange={this.bindImage} />
                  Nomor HP
                  <input type="text" className="form-control" name="no_hp"
                    value={this.state.no_hp} onChange={this.bind} required />
                  <button type="submit" className="btn btn-info pull-right m-2">
                    <span className="fa fa-check"></span> Simpan
                  </button>
                </form>
              </Modal>

              <Modal id="modal_alamat" title="Form Alamat" bg_header="success" text_header="white">
                <form onSubmit={this.Save_alamat}>
                Nama Penerima
                  <input type="text" className="form-control" name="nama_penerima"
                    value={this.state.nama_penerima} onChange={this.bind} required />
                  Nama Alamat
                  <input type="text" className="form-control" name="judul"
                    value={this.state.judul} onChange={this.bind} required />
                  Kode Pos
                  <input type="text" className="form-control" name="kode_pos"
                    value={this.state.kode_pos} onChange={this.bind} required />
                  Kecamatan
                  <input type="text" className="form-control" name="kecamatan"
                    value={this.state.kecamatan} onChange={this.bind} required />
                  Kota
                  <input type="text" className="form-control" name="kota"
                    value={this.state.kota} onChange={this.bind} required />
                  Jalan
                  <input type="text" className="form-control" name="jalan"
                    value={this.state.jalan} onChange={this.bind} required />
                  RT
                  <input type="text" className="form-control" name="rt"
                    value={this.state.rt} onChange={this.bind} required />
                  RW
                  <input type="text" className="form-control" name="rw"
                    value={this.state.rw} onChange={this.bind} required />
                  

                  <button type="submit" className="btn btn-info pull-right m-2">
                    <span className="fa fa-check"></span> Simpan
                  </button>
                </form>
              </Modal>

          </div>
        </div>
      );

    }



}
export default Profiles;
