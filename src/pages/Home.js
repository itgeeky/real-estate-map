import { useEffect, useState } from "react";
import { baseUrl, fetchApi } from "../utils/fetchApi";
import { Box, Flex } from "@chakra-ui/react";
import Banner from "../components/Banner";
import Property from "../components/Property";
import { dummyProperties } from "../utils/dummyData";

const Home = () => {
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    setProperties(dummyProperties)
  }, [])
  
  // useEffect(() => {
  //   getProperties().then((res) => {
  //     setProperties(res);
  //   });
  // }, []);

  

  // const getProperties = async () => {
  //   const propertyForSale = await fetchApi(
  //     `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=8`
  //   );
    
  //   return propertyForSale.hits;
    
  // };

  return (
    <Box position="absolute">
      <Banner
        purpose={"RENT A HOME"}
        title1={"Rental homes for"}
        title2={"Everyone"}
        desc1={"Explore Apartments, Villas, Homes"}
        desc2={"and more"}
        buttonText={"Explore Renting"}
        linkName={"/search?purpose=for-rent"}
        imageUrl={
          "https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
        }
      />
      {!!properties && (
        <Flex flexWrap="wrap" justifyContent="space-around">
          {properties.map((property) => (
            <Property property={property} key={property.id} />
          ))}
        </Flex>
      )}
    </Box>
  );
};

export default Home;
