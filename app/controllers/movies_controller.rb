class MoviesController < ApplicationController
  def create
    @movie = Movie.new(movie_params)
    if @movie.save
      render :show
    else
      @errors = @movie.errors.full_messages
      render :error
    end
  end

  def show
    @movie = Movie.find(params[:id])
    render :show
  end

  def index
    @movies = Movie.order("updated_at DESC").limit(10)
    render :index
  end

  def update
    @movie = Movie.find(params[:id])
    if @movie.update_attributes(movie_params)
      render :show
    else
      @errors = @movie.errors.full_messages
      render :error
    end
  end

  def destroy
    @movie = Movie.find(params[:id])
    @movie.destroy!
    render :show
  end

  def search
    debugger
    render :search
  end

  private

  def movie_params
    params.require(:movie).permit(:title, :storyline, :release_date, :imdb_link, genres: [])
  end
end
