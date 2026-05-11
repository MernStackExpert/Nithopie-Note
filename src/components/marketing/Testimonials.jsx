"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Alex Rivera",
      role: "Senior Full-Stack Engineer",
      image: "https://i.pravatar.cc/150?u=alex",
      content: "Finally, a note-taking app that doesn't treat developers as an afterthought. The Markdown support and code block formatting are flawless. Plus, the E2E encryption means I can safely store my API keys and env variables.",
    },
    {
      name: "Samantha Hayes",
      role: "Cybersecurity Consultant",
      image: "https://i.pravatar.cc/150?u=samantha",
      content: "I've audited dozens of productivity tools. Nithopie Note is one of the few that actually delivers on its zero-knowledge architecture promises. It's the only place I trust with my vulnerability research.",
    },
    {
      name: "Marcus Thorne",
      role: "CTO at Nova Labs",
      image: "https://i.pravatar.cc/150?u=marcus",
      content: "Moving our engineering team's documentation to Nithopie was a game-changer. The password-protected sharing lets us collaborate securely with external contractors without risking our IP.",
    },
    {
      name: "Emily Chen",
      role: "UX/UI Designer",
      image: "https://i.pravatar.cc/150?u=emily",
      content: "As a designer, I need my workspace to be visually clean. Nithopie is stunning. The UI is out of my way, and the drag-and-drop media support is perfect for building quick, secure mood boards.",
    },
    {
      name: "David O'Connor",
      role: "DevOps Engineer",
      image: "https://i.pravatar.cc/150?u=david",
      content: "Speed is everything. Nithopie syncs my terminal commands and deployment scripts instantly across my Mac and iPhone. It's blindingly fast and incredibly reliable during production incidents.",
    },
    {
      name: "Aisha Patel",
      role: "Freelance Technical Writer",
      image: "https://i.pravatar.cc/150?u=aisha",
      content: "The distraction-free editor is a blessing. I can draft extensive technical documentation in Markdown, export it cleanly, and know my drafts are completely private until I'm ready to publish.",
    },
    {
      name: "Michael Chang",
      role: "Startup Founder",
      image: "https://i.pravatar.cc/150?u=michael",
      content: "When building a startup, you have a million ideas, pitch decks, and strategies. Having a secure vault like Nithopie to organize the chaos with AI smart search has saved me countless hours.",
    },
    {
      name: "Sarah Jenkins",
      role: "Lead Data Scientist",
      image: "https://i.pravatar.cc/150?u=sarah2",
      content: "I frequently work with sensitive datasets and algorithms. Nithopie provides the perfect secure canvas to jot down query structures and Python snippets without violating any data compliance rules.",
    }
  ];

  const firstRow = testimonials.slice(0, 4);
  const secondRow = testimonials.slice(4, 8);

  const TestimonialCard = ({ testimonial }) => (
    <div className="w-[350px] md:w-[450px] flex-shrink-0 relative p-8 rounded-[2.5rem] bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-white dark:border-gray-800 shadow-xl mx-4 transition-all duration-300 hover:bg-white dark:hover:bg-gray-900">
      <div className="flex items-center gap-1 mb-6">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" />
        ))}
      </div>
      <p className="text-gray-700 dark:text-gray-300 font-medium leading-relaxed mb-8 text-base md:text-lg line-clamp-4">
        "{testimonial.content}"
      </p>
      <div className="flex items-center gap-4 mt-auto pt-6 border-t border-gray-100 dark:border-gray-800">
        <img 
          src={testimonial.image} 
          alt={testimonial.name} 
          className="w-12 h-12 rounded-full object-cover border-2 border-blue-500/30 shadow-sm"
        />
        <div>
          <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
          <p className="text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400">{testimonial.role}</p>
        </div>
        <Quote className="w-8 h-8 text-blue-500/20 ml-auto" fill="currentColor" />
      </div>
    </div>
  );

  return (
    <section className="py-24 bg-gray-50/50 dark:bg-gray-950 relative overflow-hidden">
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 1rem)); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(calc(-50% - 1rem)); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: scroll-left 40s linear infinite;
        }
        .animate-marquee-right {
          animation: scroll-right 40s linear infinite;
        }
        .pause-on-hover:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="absolute top-1/2 left-0 w-72 h-72 bg-blue-500/10 blur-[120px] rounded-full -translate-y-1/2 pointer-events-none z-0"></div>
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-purple-500/10 blur-[120px] rounded-full -translate-y-1/2 pointer-events-none z-0"></div>

      <div className="container mx-auto relative z-10 mb-16 px-6">
        <div className="text-center max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white mb-6"
          >
            Loved by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">visionaries</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-400 font-medium"
          >
            Discover why developers, designers, and founders are switching to Nithopie Note for their most critical work.
          </motion.p>
        </div>
      </div>

      <div className="relative z-10 flex flex-col gap-8 overflow-hidden">
        
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-40 bg-gradient-to-r from-gray-50/90 dark:from-gray-950 to-transparent z-20 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-40 bg-gradient-to-l from-gray-50/90 dark:from-gray-950 to-transparent z-20 pointer-events-none"></div>

        <div className="flex w-[200%] md:w-max animate-marquee-left pause-on-hover">
          {[...firstRow, ...firstRow].map((testimonial, idx) => (
            <TestimonialCard key={`row1-${idx}`} testimonial={testimonial} />
          ))}
        </div>

        <div className="flex w-[200%] md:w-max animate-marquee-right pause-on-hover">
          {[...secondRow, ...secondRow].map((testimonial, idx) => (
            <TestimonialCard key={`row2-${idx}`} testimonial={testimonial} />
          ))}
        </div>

      </div>
    </section>
  );
}