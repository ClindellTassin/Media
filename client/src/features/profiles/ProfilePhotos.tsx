import { observer } from "mobx-react-lite"
import { Button, Card, Grid, Header, Image, Tab } from "semantic-ui-react";
import { Photo, Profile } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";
import { SyntheticEvent, useState } from "react";
import PhotoUploadWidget from "../../app/common/widgets/UploadPhotoWidget";

interface Props {
    profile: Profile;
}

const ProfilePhotos = ({ profile }: Props) => {
    const { profileStore: { isCurrentUser, uploadPhoto, uploading, loading, setMainPhoto, deletePhoto } } = useStore();
    const [addPhotoMode, setAddPhotoMode] = useState(false);
    const [target, setTarget] = useState('');

    const handlePhotoUpload = (file: Blob) => {
        uploadPhoto(file).then(() => setAddPhotoMode(false));
    };

    const handleSetMainPhoto = (photo: Photo, e: SyntheticEvent<HTMLButtonElement>) => {
        setTarget(e.currentTarget.name);
        setMainPhoto(photo);
    };

    const handleDeletePhoto = (photo: Photo, e: SyntheticEvent<HTMLButtonElement>) => {
        setTarget(e.currentTarget.name);
        deletePhoto(photo);
    };

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated='left' icon='image' content='Photos' />
                    {isCurrentUser && (
                        <Button floated='right' basic content={addPhotoMode ? 'Cancel' : 'Add Photo'} onClick={() => setAddPhotoMode(!addPhotoMode)} />
                    )}
                </Grid.Column>
                <Grid.Column width={16}>
                    {addPhotoMode ? (
                        <PhotoUploadWidget uploadPhoto={handlePhotoUpload} loading={uploading} />
                    ) : (
                        <Card.Group itemsPerRow={5}>
                            {profile.photos?.map(photo => (
                                <Card key={photo.id}>
                                    <Image src={photo.url} />
                                    {isCurrentUser && (
                                        <Button.Group fluid widths={2}>
                                            <Button
                                                disabled={photo.isMain}
                                                loading={target === 'main' + photo.id && loading}
                                                basic
                                                color='green'
                                                content='Main'
                                                name={'main' + photo.id}
                                                onClick={e => handleSetMainPhoto(photo, e)}
                                            />
                                            <Button
                                                disabled={photo.isMain}
                                                loading={target === photo.id && loading}
                                                basic
                                                color='red'
                                                icon='trash'
                                                name={photo.id}
                                                onClick={e => handleDeletePhoto(photo, e)}
                                            />
                                        </Button.Group>
                                    )}
                                </Card>
                            ))}
                        </Card.Group>
                    )}
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
}

export default observer(ProfilePhotos);