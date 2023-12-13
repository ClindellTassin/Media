import { Button, Grid, Header } from "semantic-ui-react"
import DropzonePhotoWidget from "./DropzonePhotoWidget"
import { useEffect, useState } from "react"
import CropperPhotoWidget from "./CropperPhotoWidget";

interface Props {
    loading: boolean;
    uploadPhoto: (file: Blob) => void;
}

const UploadPhotoWidget = ({ loading, uploadPhoto }: Props) => {
    const [files, setFiles] = useState<any>([]);
    const [cropper, setCropper] = useState<Cropper>();

    const onCrop = () => {
        if (cropper) {
            cropper.getCroppedCanvas().toBlob(blob => uploadPhoto(blob!));
        }
    };

    useEffect(() => {
        return () => {
            files.forEach((file: object & { preview?: string }) => URL.revokeObjectURL(file.preview!));
        }
    }, [files]);

    return (
        <Grid>
            <Grid.Column width={4}>
                <Header sub color='teal' content='Step 1 - Add Photo' />
                <DropzonePhotoWidget setFiles={setFiles} />
            </Grid.Column>
            <Grid.Column width={1} />
            <Grid.Column width={4}>
                <Header sub color='teal' content='Step 2 - Resize Photo' />
                {files && files.length > 0 && (
                    <CropperPhotoWidget setCropper={setCropper} imagePreview={files[0].preview} />
                )}
            </Grid.Column>
            <Grid.Column width={1} />
            <Grid.Column width={4}>
                <Header sub color='teal' content='Step 3 - Preview & Upload' />
                {files && files.length > 0 &&
                    <>
                        <div className="img-preview" style={{ minHeight: 200, overflow: 'hidden' }} />
                        <Button.Group widths={2}>
                            <Button loading={loading} onClick={onCrop} positive icon='check' />
                            <Button disabled={loading} onClick={() => setFiles([])} icon='close' />
                        </Button.Group>
                    </>}
            </Grid.Column>
        </Grid>
    )
}

export default UploadPhotoWidget