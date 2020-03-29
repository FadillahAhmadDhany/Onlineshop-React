import React,{Component} from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";
import { Link } from 'react-router-dom';

class Order extends Component {
  constructor() {
    super();
    this.state = {
      order: [],
      id: "",
      id_pengiriman: "",
      id_user: "",
      total: "",
      bukti_bayar: "",
      alamat:"",
      status: "",
      action: "",
      find: "",
      message: ""
    }
  }

    bind = (event) => {
      this.setState({[event.target.name] : event.target.value});
    }

    get_order = () => {
      // $("#loading").toast("show");
      let url = "http://localhost/eproduk/public/order";
      axios.get(url)
      .then(response => {
        this.setState({order: response.data.order});
        // $("#loading").toast("hide");
      })
      .catch(error => {
        console.log(error);
      });
    }

    Accept = (id) => {
      if(window.confirm("APakah anda yakin mengkonfirmasi order ini?")){
        let url = "http://localhost/eproduk/public/order/accept/"+id;
        axios.post(url)
        .then(response => {
          this.get_order();
        })
        .catch(error => {
          console.log(error);
        });
      }
    }
    
    Decline = (id) => {
      if(window.confirm("APakah anda yakin mengkonfirmasi order ini?")){
        let url = "http://localhost/eproduk/public/order/decline/"+id;
        axios.post(url)
        .then(response => {
          this.get_order();
        })
        .catch(error => {
          console.log(error);
        });
      }
    }

    componentDidMount = () => {
      this.get_order();
      
    }

    Save = (event) => {
      event.preventDefault();
     
      // $("#loading").toast("show");
      
      $("#modal_produk").modal("hide");
      let url = "http://localhost/eproduk/public/produk/save";
      let form = new FormData();
      form.append("action", this.state.action);
      form.append("id_brg", this.state.id_brg);
      form.append("kd_brg", this.state.kd_brg);
      form.append("nama_brg", this.state.nama_brg);
      form.append("jenis_brg", this.state.jenis_brg);
      form.append("harga_brg", this.state.harga_brg);
      form.append("jmlh_brg", this.state.jmlh_brg);
      form.append("img_brg", this.state.img_brg, this.state.img_brg.name);
      axios.post(url, form)
      .then(response => {
        // $("#loading").toast("hide");
        this.setState({message: response.data.message});
        // $("#message").toast("show");
        this.get_produk();
      })
      .catch(error => {
        console.log(error);
      });
    }

    render(){
        return(
            <div className="container">
              <div style={{marginTop : "20px" }}>
                {/* header card */}
                <div className="#">
                  <div className="row">
                    <div className="col">
                      <h4 className="text-secondary" style={{fontWeight:"600", textAlign:"center", fontSize:"35px"}} >Data Order</h4>
                    </div>
                  </div>
                  <div className="col-sm-3" style={{textAlign:"center"}}>
                      <input type="text" className="form-control" name="find"
                        onChange={this.bind} value={this.state.find} onKeyUp={this.search}
                        placeholder="Pencarian..." />
                    </div>
    
                </div>
                {/* content card */}
                <div className="card-body">
                  <Toast id="message" autohide="true" title="Informasi">
                    {this.state.message}
                  </Toast>
                  <Toast id="loading" autohide="false" title="Informasi">
                    <span className="fa fa-spin fa-spinner"></span> Sedang Memuat
                  </Toast>
                  <table className="table table-bordered ">
                  
                    <thead className="thead-light">
                      <tr>
                        <th>ID Order</th>
                        <th>Alamat</th>
                        <th>User</th>
                        <th>Total</th>
                        <th>Bukti Bayar</th>
                        <th>Detail Order</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      { this.state.order.map((item) => {
                        return(
                          <tr key={item.id_order}>
                            <td>{item.id_order}</td>
                            <td>{item.alamat}</td>
                            <td>{item.nama_user}</td>
                            <td>{item.total}</td>
                            <td>{item.bukti_bayar}</td>
                            <td>
                              <ul className="" >
                              {item.detail.map((it) => {
                                  return(
                                    
                                    <li className="d-flex justify-content-between align-items-center" key={it.kode_produk}>{it.nama_produk} <span className="badge badge-light badge-pill">{it.quantity}</span></li>
                                    
                                  )
                              })}
                              </ul>
                            </td>
                            <td>{item.status}</td>
                            <td>
                              <Link className="m-1 btn btn-sm btn-outline-success" onClick={() => this.Accept(item.id_order)}>
                                Terima
                              </Link>
                              <Link className="m-1 btn btn-sm btn-outline-danger"
                                onClick={() => this.Decline(item.id_order)}>
                                Tolak
                              </Link>
                              </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
    
                </div>
              </div>
    
    
            </div>
          );
        }
}
export default Order;




