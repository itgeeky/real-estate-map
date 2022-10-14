import { Box, Flex, Spacer, Text } from "@chakra-ui/layout";
import { Avatar } from "@chakra-ui/avatar";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import millify from "millify";
import { baseUrl, fetchApi } from "../utils/fetchApi";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import React from "react";
import { dummyProperties, dummyObject } from "../utils/dummyData";

const PropertyDetails = () => {
  const [property, setProperty] = useState({});
  const params = useParams();
  const { propId } = params;
  React.useEffect(() => {
    const L = require("leaflet");

    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png")
    });
  }, []);

  // const getProperty = useCallback(async () => {
  //   const data = await fetchApi(
  //     `${baseUrl}/properties/detail?externalID=${propId}`
  //   );
  //   return data;
   
  // }, [propId]);

  // useEffect(() => {
  //   getProperty().then((res) => {
  //     setProperty(res);
  //   });
  // }, [getProperty]);
  // console.log(property)
  const [map, setMap] = useState(null)
  
  useEffect(() => {
    setProperty(getProperty())
  }, [])
  const getProperty = () => {
    const data = dummyProperties.find((el)=> 
      el.externalID === propId
    )
    return data
  }

  const amenities = dummyObject.amenities
  const description = dummyObject.description
  const {
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    //description,
    type,
    purpose,
    furnishingStatus,
    // amenities,
    geography,
  } = property;
  let center = [geography?.lat, geography?.lng]
  const verify =() => {
    if (map) {
      const contains = map.getBounds().contains(center);
      console.log(contains)
    }
  }
  // useEffect(() => {
  //   if (mapRef) {
  //     const contains = mapRef.leafletElement.getBounds();
  //     console.log(contains)
  //   }
  // }, []);

  return (
    <>
      {!!property.id && (
        <Box maxWidth="1000px" margin="auto" p="4">
          <Box w="full" p="6">
            <Flex paddingTop="2" alignItems="center">
              <Box paddingRight="3" color="green.400">
                {isVerified && <GoVerified />}
              </Box>
              <Text fontWeight="bold" fontSize="lg">
                USD {millify(price)} {rentFrequency && `/${rentFrequency}`}
              </Text>
              <Spacer />
              <Avatar size="sm" src={agency?.logo?.url}></Avatar>
            </Flex>
            <Flex
              alignItems="center"
              p="1"
              justifyContent="space-between"
              w="250px"
              color="blue.400"
            >
              {rooms}
              <FaBed /> | {baths} <FaBath /> | {millify(area)} sqft{" "}
              <BsGridFill />
            </Flex>
          </Box>
          <Box marginTop="2">
            <Text fontSize="lg" marginBottom="2" fontWeight="bold">
              {title}
            </Text>
            <Text lineHeight="2" color="gray.600">
              {description}
            </Text>
          </Box>
          <Flex
            flexWrap="wrap"
            textTransform="uppercase"
            justifyContent="space-between"
          >
            <Flex
              justifyContent="space-between"
              w="400px"
              borderBottom="1px"
              borderColor="gray.100"
              p="3"
            >
              <Text>Type</Text>
              <Text fontWeight="bold">{type}</Text>
            </Flex>
            <Flex
              justifyContent="space-between"
              w="400px"
              borderBottom="1px"
              borderColor="gray.100"
              p="3"
            >
              <Text>Purpose</Text>
              <Text fontWeight="bold">{purpose}</Text>
            </Flex>
            {furnishingStatus && (
              <Flex
                justifyContent="space-between"
                w="400px"
                borderBottom="1px"
                borderColor="gray.100"
                p="3"
              >
                <Text>Furnishing Status</Text>
                <Text fontWeight="bold">{furnishingStatus}</Text>
              </Flex>
            )}
          </Flex>
          <Box>
            {amenities && (
              <Text fontSize="2xl" fontWeight="black" marginTop="5" onClick={verify}>
                Facilites:
              </Text>
            )}
            <Flex flexWrap="wrap">
              {amenities?.map((item) =>
                item?.amenities?.map((amenity) => (
                  <Text
                    key={amenity.text}
                    fontWeight="bold"
                    color="blue.400"
                    fontSize="l"
                    p="2"
                    bg="gray.200"
                    m="1"
                    borderRadius="5"
                  >
                    {amenity.text}
                  </Text>
                ))
              )}
            </Flex>
            <Box w="100%" h="400" >
              <MapContainer style={{ height: "450px", width: "100%" }} center={[geography.lat, geography.lng]} zoom={13} scrollWheelZoom={false} ref={setMap}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[geography.lat, geography.lng]}>
                  <Popup>Location
                  </Popup>
                </Marker>
              </MapContainer>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default PropertyDetails;
