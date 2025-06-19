<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class CleanCourse extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:clean-course';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Limpiar cursos antiguos';

  

    /**
     * Execute the console command.
     */
    public function handle()
    {
        //

        $delete = \App\Models\Course::where('created_at', '<', now()->subDays(30))->delete();
        if ($delete) {
            $this->info('Cursos antiguos eliminados exitosamente.');
        } else {
            $this->error('No se encontraron cursos antiguos para eliminar.');
        }
    }
}
