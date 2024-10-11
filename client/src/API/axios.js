import axios from 'axios'

const getData = async () => {
  const response = await axios.get('http://localhost:8080/api/endpoint');
  console.log(response.data)
}

console.log(getData())