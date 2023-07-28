import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { BsFillPinMapFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { FaArrowUp } from "react-icons/fa";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import "./table.css";
//AIzaSyBxvspNzUmVsPmQO7D7vhvpVxq41aQxTas
const containerStyle = {
  width: "80vw",
  height: "300px",
  margin: "25px 10%",
};
function UsersTable() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBxvspNzUmVsPmQO7D7vhvpVxq41aQxTas",
  });
  const [center, setCenter] = useState();
  const [map, setMap] = useState();
  const [usersData, setUsersData] = useState();

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users ", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setUsersData(data);
      })
      .catch((error) => console.error("Error en la peticion: " + error));
  }, []);

  return (
    <>
      <Table responsive className="mt-5">
        <thead>
          <tr>
            <th>
              ID
              <FaArrowUp id="icon-arrow-up" />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Website</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {usersData ? (
            usersData.map((user, index) => (
              <tr key={index}>
                <td>{index}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.website}</td>
                <td>
                  <span
                    onClick={() => {
                      setCenter({
                        lat: Number(user.address.geo.lat),
                        lng: Number(user.address.geo.lng),
                      });
                    }}
                  >
                    <BsFillPinMapFill className="icons" id="icon-map" />
                  </span>
                  <span>
                    <AiFillDelete className="icons" id="icon-delete" />
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <></>
          )}
        </tbody>
      </Table>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={2}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          <MarkerF position={center}></MarkerF>
        </GoogleMap>
      ) : (
        <></>
      )}
    </>
  );
}

export default UsersTable;
