'use client';
import { useCallback, useEffect, useState } from 'react';
import { createClient } from '../../supabase/client';
import { type User } from '@supabase/supabase-js';
import Avatar from './Avatar';

export default function AccountForm({ user }: { user: User | null }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [website, setWebsite] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error, status } = await supabase
        .from('profiles')
        .select()
        .eq('id', user?.id)
        .single();

      if (error && status !== 406) {
        console.log(error);
        throw error;
      }

      if (data) {
        setFullname(data.full_name);
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert('Error loading user data!');
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string | null;
    fullname: string | null;
    website: string | null;
    avatar_url: string | null;
  }) {
    try {
      setLoading(true);

      const { error } = await supabase.from('profiles').upsert({
        id: user?.id as string,
        full_name: fullname,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      alert('Profile updated!');
    } catch (error) {
      alert('Error updating the data!');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-widget">
      <h1>Edit Profile</h1>
      <div className="profile-form-container">
        <div className="profile-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" type="text" value={user?.email} disabled />
          </div>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              type="text"
              value={fullname || ''}
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>
        </div>
        <Avatar
          uid={user?.id ?? null}
          url={avatar_url}
          size={200}
          onUpload={(url) => {
            setAvatarUrl(url);
            updateProfile({ fullname, username, website, avatar_url: url });
          }}
        />
      </div>
      <div className="form-actions">
        <button
          className="button primary"
          onClick={() => updateProfile({ fullname, username, website, avatar_url })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
        <form action="/auth/signout" method="post">
          <button className="button secondary" type="submit">
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}
