import React from 'react'
import { Paper, Stack } from '@mui/material';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import '../../../Components/Tab/Tab.css';
import RenderImageCard from '../../../Components/Render/RenderImageCard';
import RenderFileCard from '../../../Components/Render/RenderFileCard';

export const Attachment = (props) => {
    const blockElements = {
        content: 'tabs-content',
        panel: 'tabs-panel',
        label: 'tabs-title',
      };
      const { imageGet, docGet } = props;
    return (
        <Tabs>
        <Paper sx={{ width: 'min-content', borderRadius: '10px 10px 0 0' }}>
          <TabList>
          <Stack direction='row'>
            <Tab>Hình ảnh</Tab>
            <Tab>Tài liệu</Tab>
          </Stack>
          </TabList>
        </Paper>
        <Paper
          sx={{
            width: '100%',
            // top: '205px',
            padding: '32px',
            borderRadius: '0'
          }}
        >
          <TabPanel>
            {/* <Box sx={{ width: '200px', height: '300px' }}>
              <div className="label-holder" style={{ height: '200px' }}>
                <label htmlFor="file" className="img-upload"></label>
                <div className="result">{RenderImage(imageGet)}</div>
              </div>
            </Box> */}
            {RenderImageCard(imageGet)}
          </TabPanel>
          <TabPanel>
            {/* {docGet.length > 0 ? (
              docGet.map((item, index) => (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                  }}
                >
                  <a href={item.link}>{item.name}</a>
                </div>
              ))
            ) : (
              // <div>Không có tệp đi kèm!!</div>
              <></>
            )} */}
            {
              RenderFileCard(docGet)
            }
          </TabPanel>
        </Paper>
      </Tabs>
    )
}

export default Attachment