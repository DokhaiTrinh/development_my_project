import React, { useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageCard from '../Card/ImageCard/ImageCard';

export default function RenderImageCard(src) {
  if (src) {
    // return src.map((photo, index) => {
    return (
        <ImageList sx={{width: '100%'}} cols={4}>
          {src.map((photo, index) => (
            <ImageListItem key={photo} sx={{margin: '20px', width: 'min-content'}}>
                {
                    ImageCard(photo)
                }
            </ImageListItem>
          ))}
        </ImageList>
    );
    // });
  }
}
