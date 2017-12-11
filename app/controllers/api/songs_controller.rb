class Api::SongsController < ApplicationController

  def index
    @songs = Song.all
    render json: @songs
  end

  def create
    song = Song.create(song_params)
    render json: song
  end

  def destroy
    song = Song.find(params[:id])
    song.destroy
    render json: {status: 'ok'}
  end

private
  def song_params
    params.require(:song).permit(:title, :artist)
  end

end
