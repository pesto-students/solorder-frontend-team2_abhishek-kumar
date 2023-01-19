import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Box } from '@mui/system';
import { Button } from '@mui/material';

export default function ImageListView({ editView, galaryImgs, onDeleteImg, onSetDefaultImg, galaryView }) {

  const [hover, setHover] = React.useState(null);
  const onHover = (idx) => {
    setHover(idx)
  } 
  return (
    <ImageList sm={{ cols: 1 }} sx={{ width: galaryView ? "97%" : "90%", maxHeight: galaryView ? "87vh" : "55.3vh" }}>
      {galaryImgs?.length ? galaryImgs.map((item, idx) => (
        <ImageListItem key={item.imgId} sx={{ position: "relative" }}>
          <img
            onMouseOver={() => { if (editView) onHover(idx + 1) }}
            src={item.url}
            srcSet={item.url}
            alt={item.originalFilename}
            loading="lazy"
          />
          <Box sx={{ display: (hover === (idx + 1) && editView ? "flex" : "none"), justifyContent: "space-evenly", alignItems: "center", position: "absolute", backgroundColor: "#3b3a3a", height: "100%", width: "100%", opacity: 0.7 }}>
            {item?.isDefaultImg ?
              <Button sx={{
                width: "130px", color: "projSecondary.darker", borderColor: "projSecondary.darker", '&:hover': {
                  color: "projSecondary.darker", borderColor: "projSecondary.darker"
                }
              }}>
                Default Image
              </Button>
              :
              <>
                <Button variant="outlined" sx={{
                  width: "130px", color: "projSecondary.darker", borderColor: "projSecondary.darker", '&:hover': {
                    color: "projSecondary.darker", borderColor: "projSecondary.darker"
                  }
                }}
                  onClick={() => { onDeleteImg(item?.imgId) }}
                >
                  Delete
                </Button>
                <Button variant="outlined" sx={{
                  width: "130px", color: "projSecondary.darker", borderColor: "projSecondary.darker", '&:hover': {
                    color: "projSecondary.darker", borderColor: "projSecondary.darker"
                  }
                }}
                  onClick={() => { onSetDefaultImg(item?.imgId) }}
                >
                  Set Default
                </Button>
              </>}
          </Box>
        </ImageListItem>
      )) : ""}
    </ImageList>
  );
}

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    author: '@bkristastucchio',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
    author: '@rollelflex_graphy726',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
    author: '@helloimnik',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    author: '@nolanissac',
  },
  // {
  //   img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
  //   title: 'Hats',
  //   author: '@hjrc33',
  // },
  // {
  //   img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
  //   title: 'Honey',
  //   author: '@arwinneil',
  // },
  // {
  //   img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
  //   title: 'Basketball',
  //   author: '@tjdragotta',
  // },
  // {
  //   img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
  //   title: 'Fern',
  //   author: '@katie_wasserman',
  // },
  // {
  //   img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
  //   title: 'Mushrooms',
  //   author: '@silverdalex',
  // },
  // {
  //   img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
  //   title: 'Tomato basil',
  //   author: '@shelleypauls',
  // },
  // {
  //   img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
  //   title: 'Sea star',
  //   author: '@peterlaster',
  // },
  // {
  //   img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
  //   title: 'Bike',
  //   author: '@southside_customs',
  // },
];