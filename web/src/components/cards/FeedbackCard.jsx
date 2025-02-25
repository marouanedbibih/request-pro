import React from "react";

function FeedbackCard({ feedback}) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex flex-col items-start justify-start mt-4 gap-4">
        <img src={feedback.img} alt={feedback.client} className="w-10 h-10 rounded-full mr-4" />
        <p className="text-gray-900 font-semibold">{feedback.client}</p>
        <p className="text-gray-600">{feedback.feedback}</p>

      </div>
    </div>
  );
}

export default FeedbackCard;
