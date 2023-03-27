import useSWR from "swr";
import { Button, Card } from "react-bootstrap";

// A5 Step 3
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { useState } from "react";

export default function ArtworkCardDetail({ objectID }) {
  // accepts a single objectID prop
//   console.log(`-- ArtworkCardDetail ${objectID}`);

  // A5 Step 3
  const { data, error } = useSWR(
    objectID
      ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
      : null
  );

  // A5 Step 3
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(
    favouritesList.includes(+objectID) ? true : false
  );
  // passed objectID (props) is a string while favouritesList contains number
//   console.log(`+++ show added = ${showAdded}`);
  //   console.log(`-----showAdded - includes ${typeof +objectID}  ${favouritesList.includes(+{objectID})}`);

  // A5 Step 3
  function favouritesClicked(objectID) {
    console.log("-- Favourite button clicked");
    // console.log(`-- ObjectID:  ${objectID}`);
    if (showAdded) {
      setFavouritesList((current) => current.filter((fav) => fav != objectID)); // return a list without objectID
      setShowAdded(false);
    } else {
      setFavouritesList((current) => [...current, objectID]); // like append. current + objectID
      setShowAdded(true);
    }
    // console.log(favouritesList);
  }
  if (error) {
    return (
      <>
        <Error statusCode={404} />
      </>
    );
  } else if (data) {
    return (
      <>
        <Card>
          {data.primaryImage && (
            <Card.Img variant="top" src={data.primaryImage} />
          )}
          <Card.Body>
            <Card.Title>{data.title ? data.title : "N/A"}</Card.Title>
            <Card.Text>
              <strong>Date: </strong>{" "}
              {data.objectDate ? data.objectDate : "N/A"} <br />
              <strong>Classification: </strong>{" "}
              {data.classification ? data.classification : "N/A"}
              <br />
              <strong>Medium: </strong> {data.medium ? data.medium : "N/A"}
              <br />
              <br />
              <strong>Artist: </strong>{" "}
              {data.artistDisplayName ? data.artistDisplayName : "N/A"}
              {data.artistDisplayName && (
                <>
                  ({" "}
                  <a
                    href={data.artistWikidata_URL}
                    target="_blank"
                    rel="noreferrer"
                  >
                    wiki
                  </a>{" "}
                  )
                </>
              )}{" "}
              <br />
              <strong>Credit Line: </strong>
              {data.creditLine ? data.creditLine : "N/A"}
              <br />
              <strong>Dimensions: </strong>
              {data.dimensions ? data.dimensions : "N/A"}
              <br />
              <Button
                variant={showAdded ? "primary" : "outline-primary"}
                onClick={() => favouritesClicked(data.objectID)}
              >
                {showAdded ? "+Favourite ( added ) " : "+Favourite"}{" "}
              </Button>
            </Card.Text>
          </Card.Body>
        </Card>
      </>
    );
  } else {
    return null;
  }
}
