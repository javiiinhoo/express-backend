const express = require("express");
const router = express.Router();
const db = require("./models/connection");

// Ruta para obtener jugadores por categoría
router.get("/jugadores/:categoria", (req, res) => {
  const categoria = req.params.categoria;
  const sql = `
    SELECT jugadores.nombre
    FROM jugadores 
    JOIN categorias ON jugadores.categoria_id = categorias.id 
    WHERE categorias.nombre = ?
  `;

  db.query(sql, [categoria], (err, result) => {
    if (err) {
      return res.status(500).send("Error al obtener jugadores");
    }
    res.json({ jugadores: result });
  });
});

// Ruta para guardar una evaluación individual
router.post("/evaluaciones/individuales", (req, res) => {
  const {
    jugador,
    categoria,
    jornada,
    relacionConBalon,
    concentracionTensionCompetitiva,
    esfuerzoSoporteFisico,
    tomaDecisiones,
    duelosOfensivos,
    duelosDefensivos,
    comentarios,
  } = req.body;

  const sql = `
    INSERT INTO evaluaciones_individuales (jugador, categoria, jornada, relacion_con_balon, concentracion_tension_competitiva, esfuerzo_soporte_fisico, toma_decisiones, duelos_ofensivos, duelos_defensivos, comentarios) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      jugador,
      categoria,
      jornada,
      relacionConBalon,
      concentracionTensionCompetitiva,
      esfuerzoSoporteFisico,
      tomaDecisiones,
      duelosOfensivos,
      duelosDefensivos,
      comentarios,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).send("Error al guardar evaluación individual");
      }
      res
        .status(201)
        .json({ message: "Evaluación individual guardada con éxito" });
    }
  );
});

// Ruta para obtener los aspectos colectivos
router.get("/aspectos_colectivos", (req, res) => {
  const query =
    "SELECT categoria, descripcion FROM aspectos_colectivos ORDER BY categoria";

  db.query(query, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al obtener aspectos colectivos" });
    }

    const aspectos = result.reduce((acc, row) => {
      if (!acc[row.categoria]) {
        acc[row.categoria] = [];
      }
      acc[row.categoria].push(row.descripcion);
      return acc;
    }, {});

    res.json(aspectos);
  });
});

// Ruta para guardar una evaluación colectiva
router.post("/evaluaciones/colectivas", (req, res) => {
  const {
    categoria,
    jornada,
    ataqueSuperarLineasPresion,
    ataqueSuperarJuegoCorto,
    ataqueProgresarCirculacion,
    ataqueCrearSituaciones,
    transicionOfensivaFinalizarRapido,
    transicionOfensivaAtaqueRapido,
    transicionOfensivaReiniciarProgresion,
    defensaRecuperarCondicionarPosesion,
    defensaRecuperarCondicionarInicio,
    defensaEvitarProgresion,
    defensaEvitarFinalizacion,
    transicionDefensivaRecuperarTrasPerdida,
    transicionDefensivaEvitarProgresion,
    transicionDefensivaProtegerPorteria,
    comentarios,
  } = req.body;

  const sql = `
    INSERT INTO evaluaciones_colectivas (
      categoria, jornada,
      ataque_superar_lineas_presion, ataque_superar_juego_corto, ataque_progresar_circulacion, ataque_crear_situaciones,
      transicion_ofensiva_finalizar_rapido, transicion_ofensiva_ataque_rapido, transicion_ofensiva_reiniciar_progresion,
      defensa_recuperar_condicionar_posesion, defensa_recuperar_condicionar_inicio, defensa_evitar_progresion, defensa_evitar_finalizacion,
      transicion_defensiva_recuperar_tras_perdida, transicion_defensiva_evitar_progresion, transicion_defensiva_proteger_porteria, comentarios
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      categoria,
      jornada,
      ataqueSuperarLineasPresion,
      ataqueSuperarJuegoCorto,
      ataqueProgresarCirculacion,
      ataqueCrearSituaciones,
      transicionOfensivaFinalizarRapido,
      transicionOfensivaAtaqueRapido,
      transicionOfensivaReiniciarProgresion,
      defensaRecuperarCondicionarPosesion,
      defensaRecuperarCondicionarInicio,
      defensaEvitarProgresion,
      defensaEvitarFinalizacion,
      transicionDefensivaRecuperarTrasPerdida,
      transicionDefensivaEvitarProgresion,
      transicionDefensivaProtegerPorteria,
      comentarios,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).send("Error al guardar evaluación colectiva");
      }
      res
        .status(201)
        .json({ message: "Evaluación colectiva guardada con éxito" });
    }
  );
});

module.exports = router;
