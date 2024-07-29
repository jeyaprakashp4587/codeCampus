import axios from "axios";
import moment from "moment";

const Actitivity = (props) => {
  // const res = await axios.post(`${Api}/`)
  console.log(moment().format("YYYY-MM-DD"));
  return props.a + props.b;
};
module.exports;
