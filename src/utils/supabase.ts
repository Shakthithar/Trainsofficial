import { createClient } from '@supabase/supabase-js';

// In a real production app, these would be environment variables
const supabaseUrl = 'https://your-supabase-url.supabase.co';
const supabaseAnonKey = 'your-supabase-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const saveChatMessage = async ({
  message,
  sender,
}: {
  message: string;
  sender: 'user' | 'bot';
}) => {
  try {
    // This is a mock implementation
    // In a real app, you would uncomment this code and use your actual Supabase credentials
    
    /*
    const { error } = await supabase.from('chat_messages').insert({
      message,
      sender,
      created_at: new Date(),
    });

    if (error) throw error;
    */
    
    // For now, just log to console
    console.log('Message saved:', { message, sender, timestamp: new Date() });
    
    return true;
  } catch (error) {
    console.error('Error saving message:', error);
    return false;
  }
};

export const getTeamMembers = async () => {
  try {
    // This would be a real Supabase query in production
    // For now, return mock data
    return {
      data: [
        {
          id: 1,
          name: 'S.S. KARTHIGAA DEVI',
          position: 'Founder & Director',
          quote: 'My dream is to make every learner a leader and every project a startup.',
          image: 'https://randomuser.me/api/portraits/women/1.jpg',
        },
        {
          id: 2,
          name: 'A.S. HARIHARA PRASATH',
          position: 'Chief Executive Officer',
          quote: 'Build. Brand. Become – At TRAInS, we don\'t just teach; we launch futures.',
          image: 'https://randomuser.me/api/portraits/men/1.jpg',
        },
        {
          id: 3,
          name: 'M. RAM PRASATH',
          position: 'Chief Operating Officer',
          quote: 'We turn teamwork into real work – one project, one brand, one future at a time.',
          image: 'https://randomuser.me/api/portraits/men/2.jpg',
        },
        {
          id: 4,
          name: 'KARISHMA',
          position: 'Director of Human Resources',
          quote: 'People power innovation – I shape the teams that shape the future.',
          image: 'https://randomuser.me/api/portraits/women/2.jpg',
        },
        {
          id: 5,
          name: 'M. BHUVANESHWARAN',
          position: 'Head of Business Strategy',
          quote: 'Vision without execution is just a dream – I turn strategies into scalable actions.',
          image: 'https://randomuser.me/api/portraits/men/3.jpg',
        },
        {
          id: 6,
          name: 'GAYATHRI',
          position: 'Head of Marketing',
          quote: 'Marketing isn\'t about selling – it\'s about making our mission visible to the world.',
          image: 'https://randomuser.me/api/portraits/women/3.jpg',
        },
        {
          id: 7,
          name: 'M. GURU PRASATH',
          position: 'Chief Technology Officer',
          quote: 'Code is the new canvas – I help students paint their success story.',
          image: 'https://randomuser.me/api/portraits/men/4.jpg',
        },
        {
          id: 8,
          name: 'K. SUBASH THANGAM',
          position: 'Head of Cloud Computing Services & Design',
          quote: 'From idea to cloud – I make student innovations fly.',
          image: 'https://randomuser.me/api/portraits/men/5.jpg',
        },
        {
          id: 9,
          name: 'A.J. PRANAV ANAND',
          position: 'Head of Applications Development',
          quote: 'Apps that work. Apps that wow. That\'s my mantra.',
          image: 'https://randomuser.me/api/portraits/men/6.jpg',
        },
        {
          id: 10,
          name: 'R. PRABANJAN',
          position: 'Head of AI Modelling & Embedded Systems',
          quote: 'Smart systems start with smarter minds – I train them to build tomorrow\'s intelligence.',
          image: 'https://randomuser.me/api/portraits/men/7.jpg',
        }
      ],
      error: null,
    };
  } catch (error) {
    console.error('Error fetching team members:', error);
    return { data: null, error };
  }
};