import React, { useEffect } from 'react';
import { useRouter } from '../contexts/RouterContext';
import { testimonials } from '../data/mockData';
import { Star, Quote, Heart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store';
import { fetchReviewsLatest } from '@/app/features/reviews/reviewsSlice';

export function TestimonialsSection() {
  const { navigate } = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { data: reviews, loading, error } = useSelector((state: RootState) => state.latest_reviews);

  useEffect(() => {
    dispatch(fetchReviewsLatest());
  },[])

  console.log(reviews,"reviews");
  

  return (
    <section className="py-20 bg-gradient-to-br from-accent/10 via-background to-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 mb-6 bg-gradient-to-r from-pink-500/10 to-red-500/10 rounded-full border border-pink-500/20">
            <Heart className="w-4 h-4 mr-2 text-pink-600" />
            <span className="text-sm font-medium text-pink-600">Customer Love</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            What Our Customers Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Join over 1 million satisfied customers who trust us for their digital gift card needs. 
            Here's what they have to say about their experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews?.map((testimonial, index) => (
            <div 
              key={index} 
              className="group animate-fade-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative overflow-hidden bg-card border border-border rounded-3xl shadow-custom hover:shadow-custom-xl transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-2 h-full">
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-br from-primary/0 to-purple-600/0 group-hover:from-primary/20 group-hover:to-purple-600/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                
                <div className="relative p-8 h-full flex flex-col">
                  {/* Quote icon */}
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-purple-600/10 rounded-2xl blur-sm"></div>
                    <div className="relative w-12 h-12 bg-gradient-to-br from-primary/10 to-purple-600/10 rounded-2xl flex items-center justify-center">
                      <Quote className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  
                  {/* Rating */}
                  <div className="flex mb-6">
                    {[...Array(Math.round(testimonial?.rating))].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Testimonial text */}
                  <blockquote className="text-card-foreground mb-6 text-lg leading-relaxed italic flex-1">
                    "{testimonial?.comment}"
                  </blockquote>

                  {/* Customer info */}
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg shadow-custom uppercase">
                        {testimonial?.user_id?.first_name?.substring(0,2) || "U"}
                      </div>
                      <div className="absolute -inset-1 bg-gradient-to-br from-primary/30 to-purple-600/30 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    <div>
                      <div className="font-semibold text-card-foreground capitalize">{testimonial?.user_id?.first_name || "Unknown"} { testimonial?.user_id?.last_name && testimonial?.user_id?.last_name}</div>
                      {/* <div className="text-sm text-muted-foreground">{testimonial?.first_name}</div> */}
                    </div>
                  </div>
                  
                  {/* Verified badge */}
                  <div className="absolute top-6 right-6 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                    <Heart className="w-3 h-3 mr-1" />
                    Verified
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <p className="text-lg text-muted-foreground mb-6">Ready to join our happy customers?</p>
          <button 
            onClick={() => navigate('explore')}
            className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary to-purple-600 text-primary-foreground rounded-2xl font-semibold shadow-custom-lg hover:shadow-custom-xl transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-purple-600/90 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative">Start Shopping Now</span>
          </button>
        </div>
      </div>
    </section>
  );
}