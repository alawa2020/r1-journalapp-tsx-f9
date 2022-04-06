import Swal from "sweetalert2";

const api = process.env.REACT_APP_CLOUDINARY_API || '';

export const uploadImgAndGetUrl = async( imgFile: File ) => {
  const formData = new FormData();
  formData.append('file', imgFile);
  formData.append('upload_preset', 'react-journal-curso');
  formData.append('folder', 'r1-journalapp-ts-f9');

  const options = {
    method: 'POST',
    body: formData,
  }

  try {
    Swal.fire({
      title: "Uploading...",      
      text: "Please wait...",       
      showConfirmButton: false,       
      allowOutsideClick: false,       
        willOpen: () => {         
        Swal.showLoading();       
        },     
    });

    const resp = await fetch( api, options );
    Swal.close();

    if(resp.ok) {
      const { secure_url } = await resp.json();
      Swal.fire('Success', 'Image uploaded succesfully', 'success');
      return secure_url;
    } else {
      throw new Error('error uploading image ')
    }
  } catch (err) {
    Swal.fire('Error', 'Error when uploading the image', 'error');
    console.log(err);
  }

}
