import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button, Spinner } from 'react-bootstrap';
import {
  fetchDetail,
  isLoadingDetail,
  completeDetail,
  errorDetail
} from '../redux/slices/detail';

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const note = useSelector(completeDetail);
  const isLoading = useSelector(isLoadingDetail);
  const error = useSelector(errorDetail);


  useEffect(() => {
    dispatch(fetchDetail(id));
  }, [id]);

  return (
    <div>
      {
        isLoading && (<div className="text-center mt-3">
          <Spinner animation="border" role="status">
          </Spinner>
        </div>)
      }

      {
        !isLoading && (
          <div className='my-3'>
            <Card>
              <Card.Header as="h5">Note</Card.Header>
              <Card.Body>
                <Card.Title>{id}</Card.Title>
                <Card.Text>
                  {note.content}
                </Card.Text>
                <Button
                  onClick={() => navigate('/notes')}
                  variant="primary">back</Button>
              </Card.Body>
            </Card>
          </div>
        )
      }



      {!error && <div>Hubo un error</div>}
    </div>
  );
};

export default Detail;