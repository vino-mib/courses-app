import Button from '../../../../common/Button/Button';
import formatCreationDate from '../../../../helpers/formatCreationDate';
import formatDuration from '../../../../helpers/getCourseDuration';
import './CourseCard.css';

const CourseCard: React.FC<CourseCardProps> = (props) => {
    return (
        <div className="card mb-md-3">
            <div className="card-body">
                <div className="row">
                    <div className="col-sm-8 col-sm-6">
                        <h4>{props.title}</h4>
                        <p>{props.description}</p>
                    </div>
                    <div className="col-md-4 col-sm-6">
                        <div className='eclipsis-text'><b>Authors:</b> {props.authors}</div>
                        <div><b>Duration:</b> {formatDuration(props.duration)}</div>
                        <div><b>Created:</b> {formatCreationDate(props.creationDate)}</div>
                        <div className="mt-md-3 d-flex justify-content-center flex-nowrap">
                            <Button label="Show course" class="btn btn-outline-primary"></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseCard;
