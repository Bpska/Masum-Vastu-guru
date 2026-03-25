import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Award, Users } from 'lucide-react';
import StarRating from '../common/StarRating';

const levelColors = {
  Foundation: 'bg-green-600',
  Specialized: 'bg-maroon',
  Expert: 'bg-yellow text-maroon',
};

const CourseCard = ({ course, index = 0, onEnroll }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl overflow-hidden shadow-md card-hover border border-transparent hover:border-yellow/50"
    >
      <div className="relative aspect-video overflow-hidden">
        <img src={course.image} alt={course.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.08]" />
        <span className={`absolute bottom-3 left-3 text-white text-xs font-bold px-3 py-1 rounded-md ${levelColors[course.level] || 'bg-maroon'}`}>
          {course.level}
        </span>
        {course.certified && (
          <div className="absolute top-3 right-3 bg-yellow rounded-full p-1.5">
            <Award size={16} className="text-maroon" />
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-poppins font-semibold text-text-dark line-clamp-2 mb-1">{course.name}</h3>
        <p className="text-xs text-text-mid font-poppins mb-2">By {course.instructor}</p>
        <div className="flex items-center gap-2 mb-2">
          <StarRating rating={course.rating} size={14} />
          <span className="text-xs text-text-mid">{course.rating}</span>
          <span className="text-xs text-text-mid">• {course.enrollments} enrolled</span>
        </div>
        <div className="flex items-center gap-4 mb-3 text-xs text-text-mid font-poppins">
          <span className="flex items-center gap-1"><Clock size={14} /> {course.duration}</span>
          {course.certified && <span className="flex items-center gap-1"><Award size={14} /> Certified</span>}
        </div>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-maroon font-bold text-xl">₹{course.price.toLocaleString()}</span>
          <span className="text-text-mid line-through text-sm">₹{course.originalPrice.toLocaleString()}</span>
        </div>
        <div className="flex gap-2">
          <Link to={`/courses/${course.id}`} className="btn-outline flex-1 text-center text-sm py-2">View Details</Link>
          <button onClick={() => onEnroll?.(course.name)} className="btn-primary flex-1 text-sm py-2">Enroll Now</button>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
