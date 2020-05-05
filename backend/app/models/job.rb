class Job < ApplicationRecord

  belongs_to :user 
  has_one :resume 
  has_many :notes 
  has_many :job_tasks

end
