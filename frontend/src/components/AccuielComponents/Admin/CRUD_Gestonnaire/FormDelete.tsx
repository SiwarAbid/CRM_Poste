import React from 'react'

const DeleteBloc: React.FC = () => {
    return (
      <>
        <p>Are you sure you want to delete these Records?</p>
        <p className="text-warning">
          <small>This action cannot be undone.</small>
        </p>
      </>
    );
  };
/** CSS Alert Delete */

export default DeleteBloc