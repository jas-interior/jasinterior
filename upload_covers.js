
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const brainDir = 'C:/Users/jafar khan/.gemini/antigravity/brain/739003b8-4f2b-4c5d-b341-f66d3229f1a2';
const files = fs.readdirSync(brainDir);

const mapping = {
  'living_room_cover': 'living-room-ideas',
  'bedroom_cover': 'bedroom-ideas',
  'kitchen_cover': 'kitchen-ideas',
  'dining_room_cover': 'dining-room-ideas',
  'safety_door_cover': 'safety-door-ideas',
  'shoe_rack_cover': 'shoe-rack-ideas',
  'wardrobe_cover': 'wardrobe-ideas',
  'bed_cover': 'bed-ideas',
  'false_ceiling_cover': 'false-ceiling-ideas',
  'curtain_cover': 'curtain-ideas'
};

async function uploadAndLink() {
  for (const [prefix, slug] of Object.entries(mapping)) {
    const file = files.find(f => f.startsWith(prefix) && f.endsWith('.jpg'));
    if (!file) {
      console.log('Not found:', prefix);
      continue;
    }

    const filePath = brainDir + '/' + file;
    const fileBuffer = fs.readFileSync(filePath);
    
    const fileName = 'cover-' + slug + '-' + Date.now() + '.jpg';
    
    console.log('Uploading', file, 'for', slug);
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('interior-ideas')
      .upload(fileName, fileBuffer, { contentType: 'image/jpeg', upsert: false });
      
    if (uploadError) {
      console.error('Upload Error:', uploadError);
      continue;
    }
    
    const { data: { publicUrl } } = supabase.storage.from('interior-ideas').getPublicUrl(fileName);
    
    const { error: updateError } = await supabase
      .from('interior_idea_categories')
      .update({ cover_image: publicUrl })
      .eq('slug', slug);
      
    if (updateError) {
      console.error('Update Error:', updateError);
    } else {
      console.log('Success:', slug);
    }
  }
}

uploadAndLink();

