import React, {useState, useEffect} from 'react';
import './PhotoGallery.css';
import FileUploadView from './FileUploadView';
import {getSingleFiles, getMultipleFiles} from '../../api/api';

import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import { ImageGroup, Image } from 'react-fullscreen-image';

const StyledTitle = styled.h4`
    color:red;
    text-decoration: underline;
`;

const StyledMainTitle= styled.h3`
    color:green;
    text-decoration: italic;
`;

const StyledImg = styled.img`
    margin: 10px;
    border: 1px solid black;

    ${({ theme }) => theme.mq.bigTablet} {
      height: 85px;
    }

    ${({ theme }) => theme.mq.smallTablet} {
      height: 60px;
    }
`;

function PhotoGallery() {
  const [singleFiles, setSingleFiles] = useState([]);
  const [multipleFiles, setMultipleFiles] = useState([]);

  const getSingleFileslist = async () => {
    try {
        const fileslist = await getSingleFiles();
        setSingleFiles(fileslist);
    } catch (error) {
      console.log(error);
    }
  }
  
  const getMultipleFilesList = async () => {
    try {
        const fileslist = await getMultipleFiles();
        setMultipleFiles(fileslist);
        console.log(multipleFiles);
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    getSingleFileslist();
    getMultipleFilesList();
  }, []);

  return (
    <>
       <Grid container spacing={3}>
                <FileUploadView getsingle={() => getSingleFileslist()} getMultiple={() => getMultipleFilesList()}/>

                <Grid item xs={6}>
                        <hr/>
                        <StyledMainTitle>Single Files Gallery:</StyledMainTitle>
                        <Box display="flex" flexWrap="wrap">
                                    {singleFiles.map((file, index) => 
                                                  <div className="container">
                                                          <ImageGroup >
                                                              <ul className="images">
                                                                <li key={`http://localhost:8080/${file.filePath}`}>
                                                                  <Image 
                                                                    src={`http://localhost:8080/${file.filePath}`}
                                                                    alt="nature"
                                                                  />
                                                                </li>
                                                              </ul>
                                                          </ImageGroup>
                                                  </div>
                                    )}
                        </Box>
                </Grid>

                <Grid item xs={6}>
                    <hr/>
                    <StyledMainTitle>Multiple Files Gallery:</StyledMainTitle>
                    <Box display="flex" flexWrap="wrap">
                        {multipleFiles.map((element, index) =>
                            <div key={element._id}>
                                <StyledTitle>{element.title}</StyledTitle>
                                {element.files.map((file, index) =>
                                                <div className="container">
                                                          <ImageGroup >
                                                              <ul className="images">
                                                                <li key={`http://localhost:8080/${file.filePath}`}>
                                                                  <Image 
                                                                    src={`http://localhost:8080/${file.filePath}`}
                                                                    alt="nature"
                                                                  />
                                                                </li>
                                                              </ul>
                                                          </ImageGroup>
                                                </div>
                                )}
                            </div>
                        )}
                    </Box>
                </Grid>
       </Grid>
    </>
  );
}

export default PhotoGallery;
