import React, { useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import FileCard from '../Card/FileCard/FileCard';

export default function RenderFileCard(src) {
  if (src) {
    // return src.map((photo, index) => {
    return (
        <ImageList sx={{width: '100%'}} cols={4}>
          {src.map((file, index) => (
            <ImageListItem key={file} sx={{margin: '20px', width: 'min-content'}}>
                {
                    FileCard(file)
                }
            </ImageListItem>
          ))}
        </ImageList>
    );
    // });
  }
}
