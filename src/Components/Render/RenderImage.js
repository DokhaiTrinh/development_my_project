import React, { useState } from 'react';
import { Box, Badge, Typography } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { sr } from 'date-fns/locale';
export default function RenderImage(src) {
  const [isShown, setIsShown] = useState(false);
  if (src) {
    // return src.map((photo, index) => {
    return (
      <Badge
      // badgeContent={<CancelIcon />}
      // onClick={() => handleDeleteImage(photo, index)}
      >
        {/* <img
                style={{
                  width: '50%',
                  // height: '100%',
                  // borderRadius: "50%",
                  marginRight: '5px',
                  marginBottom: '5px',
                  borderRadius: '10px'
                }}
                onClick
                src={photo}
                key={index}
              /> */}
        <ImageList sx={{ height: '150px' }} cols={3} rowHeight={150}>
          {src.map((photo, index) => (
            <ImageListItem key={photo}>
              <img
                src={photo}
                key={index}
                style={{ objectFit: 'cover', width: 150 }}
                onMouseOver={() => setIsShown(true)}
                onMouseOut={() => setIsShown(false)}
              />
              {isShown && (
                <Box
                  sx={{
                    height: '150px',
                    width: '100%',
                    backgroundColor: 'gray',
                    opacity: 0.4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                  }}
                >
                  <ZoomInIcon fontSize="large" />
                </Box>
              )}
            </ImageListItem>
          ))}
        </ImageList>
      </Badge>
    );
    // });
  }
}
